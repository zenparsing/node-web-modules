import { run } from './runner.js';

run((assert) => {
  assert.deepStrictEqual(import.meta.require('./cjs.js'), {
    name: 'cjs',
  });
});
