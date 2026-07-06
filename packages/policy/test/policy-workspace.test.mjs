import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageUrl = new URL('../package.json', import.meta.url);

test('policy workspace remains addressable by the root quality gate', async () => {
  const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'));

  assert.equal(packageJson.name, '@echelon/policy');
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.scripts?.test, 'node --test');
});
