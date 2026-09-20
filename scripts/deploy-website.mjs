// Builds website/, syncs it to the site bucket, then invalidates CloudFront - in that order.
//
// The bucket and distribution come from the stack's outputs, so there is nothing to set by hand and
// a recreated stack (which gets a new distribution ID) can't leave a stale value behind.
//
//   npm run deploy:website                deploy
//   npm run deploy:website -- --dry-run   look up the stack and print what would run, change nothing
import { execFileSync } from 'node:child_process';

import { getStackTargets } from './stack-outputs.mjs';

// Keep these in step with stack_name, profile and region in samconfig.toml
const STACK_NAME = 'ironbear';
const AWS_PROFILE = 'ironbear';
const AWS_REGION = 'us-east-1';

const awsFlags = ['--profile', AWS_PROFILE, '--region', AWS_REGION];
const dryRun = process.argv.includes('--dry-run');

function lookUpStack() {
  console.log(`Looking up stack ${STACK_NAME} (profile ${AWS_PROFILE}, ${AWS_REGION})...`);
  let json;
  try {
    json = execFileSync(
      'aws',
      ['cloudformation', 'describe-stacks', '--stack-name', STACK_NAME, '--output', 'json', ...awsFlags],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
  } catch (error) {
    // aws prints the reason (expired credentials, missing stack, no permission) to stderr
    const reason = error.stderr?.toString().trim() || error.message;
    throw new Error(`Could not read stack ${STACK_NAME}:\n${reason}`);
  }
  return getStackTargets(JSON.parse(json), STACK_NAME);
}

function run(command, args) {
  console.log(`> ${command} ${args.join(' ')}`);
  if (dryRun) return;
  execFileSync(command, args, { stdio: 'inherit' });
}

// `npm` is npm.cmd on Windows, and running a .cmd needs a shell (which Node now warns about). npm
// tells scripts it launches where its own CLI file is, so run that with node directly instead.
function runNpm(args) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error('Run this through npm: npm run deploy:website');
  }
  console.log(`> npm ${args.join(' ')}`);
  if (dryRun) return;
  execFileSync(process.execPath, [npmCli, ...args], { stdio: 'inherit' });
}

try {
  const { bucketName, distributionId } = lookUpStack();
  console.log(`Bucket: ${bucketName}\nDistribution: ${distributionId}\n`);
  if (dryRun) console.log('Dry run: showing the steps without running them.\n');

  // Each step throws on a non-zero exit, so a failed build or sync never reaches the invalidation.
  runNpm(['--prefix', 'website', 'run', 'build']);
  run('aws', ['s3', 'sync', 'website/dist', `s3://${bucketName}/`, '--delete', ...awsFlags]);
  run('aws', [
    'cloudfront',
    'create-invalidation',
    '--distribution-id',
    distributionId,
    '--paths',
    '/*',
    ...awsFlags,
  ]);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
