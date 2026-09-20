// Builds website/, syncs it to the site bucket, then invalidates CloudFront - in that order.
// Written in Node (not inline shell in package.json) so `${VAR}` expansion and quoting behave the
// same on Windows cmd.exe and POSIX shells.
//
//   WEBSITE_BUCKET_NAME=<bucket> CLOUDFRONT_DISTRIBUTION_ID=<id> npm run deploy:website
import { execFileSync } from 'node:child_process';

const { WEBSITE_BUCKET_NAME, CLOUDFRONT_DISTRIBUTION_ID } = process.env;

const missing = ['WEBSITE_BUCKET_NAME', 'CLOUDFRONT_DISTRIBUTION_ID'].filter(
  (name) => !process.env[name],
);
if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
  console.error(
    'Both come from the stack outputs: WebsiteBucketName and DistributionId (sam list stack-outputs).',
  );
  process.exit(1);
}

function run(command, args) {
  console.log(`> ${command} ${args.join(' ')}`);
  // shell is needed for `npm` (npm.cmd on Windows); args here are fixed or from validated env vars
  execFileSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
}

// Each step throws on a non-zero exit, so a failed build or sync never reaches the invalidation.
run('npm', ['--prefix', 'website', 'run', 'build']);
run('aws', ['s3', 'sync', 'website/dist', `s3://${WEBSITE_BUCKET_NAME}/`, '--delete']);
run('aws', [
  'cloudfront',
  'create-invalidation',
  '--distribution-id',
  CLOUDFRONT_DISTRIBUTION_ID,
  '--paths',
  '/*',
]);
