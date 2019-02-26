import * as assert from 'assert';

export function run(test) {
  Promise.resolve(test(assert)).catch((e) => {
    setTimeout(() => assert.fail(e), 0);
  });
}
