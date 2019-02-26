import { run } from './runner.js';
import { value } from 'p1';

run(async (assert) => {
  assert.strictEqual(value, 1);

  try {
    await import('p1/main.js');
    assert.fail('Deep imports should not work for string-valued exports');
  } catch {}

  try {
    await import('p1/.');
    assert.fail('Single dot deep import should not work for string-valued exports');
  } catch {}

});
