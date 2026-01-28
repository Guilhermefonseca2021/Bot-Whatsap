import test from 'node:test';
import assert from 'node:assert/strict';
import client from './client-whatsapp';

test('WhatsApp client should have an initialize method', () => {
  assert.equal(typeof client.initialize, 'function');
});
   