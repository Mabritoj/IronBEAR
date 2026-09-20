// Pure helper for deploy-website.mjs: turns `aws cloudformation describe-stacks` JSON into the
// bucket and distribution to deploy to. Kept separate from the script so it can be tested without AWS.

// A stack in one of these states has settled and its outputs are trustworthy.
const DEPLOYABLE_STATUSES = new Set(['CREATE_COMPLETE', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE']);

const REQUIRED_OUTPUTS = ['WebsiteBucketName', 'DistributionId'];

/**
 * @param {{ Stacks?: Array<{ StackStatus: string, Outputs?: Array<{ OutputKey: string, OutputValue: string }> }> }} describeStacks
 * @param {string} stackName
 * @returns {{ bucketName: string, distributionId: string }}
 */
export function getStackTargets(describeStacks, stackName) {
  const stack = describeStacks?.Stacks?.[0];
  if (!stack) {
    throw new Error(`Stack "${stackName}" was not found.`);
  }

  if (!DEPLOYABLE_STATUSES.has(stack.StackStatus)) {
    throw new Error(
      `Stack "${stackName}" is ${stack.StackStatus}. Wait for it to finish (or fix/delete it) before deploying the site.`,
    );
  }

  const outputs = Object.fromEntries(
    (stack.Outputs ?? []).map(({ OutputKey, OutputValue }) => [OutputKey, OutputValue]),
  );
  const missing = REQUIRED_OUTPUTS.filter((key) => !outputs[key]);
  if (missing.length > 0) {
    throw new Error(
      `Stack "${stackName}" has no ${missing.join(' / ')} output. Run "sam deploy --config-env prd" to publish the latest template first.`,
    );
  }

  return { bucketName: outputs.WebsiteBucketName, distributionId: outputs.DistributionId };
}
