import { run } from './runner.js';

run(async (assert) => {
  assert.deepStrictEqual(
    { ...await import('p2') },
    { name: 'main' });

  assert.deepStrictEqual(
    { ...await import('p2/a') },
    { name: 'a-1' });

  assert.deepStrictEqual(
    { ...await import('p2/a-2.js') },
    { name: 'a-2' });
});
