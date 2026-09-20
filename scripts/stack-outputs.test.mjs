import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getStackTargets } from './stack-outputs.mjs';

const stack = (overrides = {}) => ({
  Stacks: [
    {
      StackStatus: 'CREATE_COMPLETE',
      Outputs: [
        { OutputKey: 'WebsiteBucketName', OutputValue: 'ironbear-prd-website' },
        { OutputKey: 'DistributionId', OutputValue: 'EABCDEF123456' },
        { OutputKey: 'DistributionDomainName', OutputValue: 'd111.cloudfront.net' },
      ],
      ...overrides,
    },
  ],
});

describe('getStackTargets', () => {
  it('returns the bucket and distribution from the stack outputs', () => {
    assert.deepEqual(getStackTargets(stack(), 'ironbear-prd'), {
      bucketName: 'ironbear-prd-website',
      distributionId: 'EABCDEF123456',
    });
  });

  it('accepts a settled stack that has been updated', () => {
    for (const StackStatus of ['UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE']) {
      assert.doesNotThrow(() => getStackTargets(stack({ StackStatus }), 'ironbear-prd'));
    }
  });

  it('throws when the stack does not exist', () => {
    assert.throws(() => getStackTargets({ Stacks: [] }, 'ironbear-prd'), /was not found/);
    assert.throws(() => getStackTargets({}, 'ironbear-prd'), /was not found/);
  });

  it('refuses to deploy while the stack is mid-change or failed', () => {
    for (const StackStatus of ['CREATE_IN_PROGRESS', 'ROLLBACK_COMPLETE', 'UPDATE_IN_PROGRESS']) {
      assert.throws(
        () => getStackTargets(stack({ StackStatus }), 'ironbear-prd'),
        new RegExp(`is ${StackStatus}`),
      );
    }
  });

  it('names the missing output when the template is out of date', () => {
    const noDistribution = stack({
      Outputs: [{ OutputKey: 'WebsiteBucketName', OutputValue: 'ironbear-prd-website' }],
    });
    assert.throws(() => getStackTargets(noDistribution, 'ironbear-prd'), /DistributionId output/);
    assert.throws(() => getStackTargets(stack({ Outputs: undefined }), 'ironbear-prd'), /output/);
  });
});
