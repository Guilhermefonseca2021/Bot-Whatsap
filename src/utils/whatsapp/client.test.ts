import test from 'node:test';
import assert from 'node:assert/strict';
import client from './client-whatsapp';

test('WhatsApp client should be defined', () => {
  assert.ok(client);
});
