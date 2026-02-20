import assert from "node:assert";
import { test, mock } from 'node:test';

interface MockClient {
  events: Record<string, Function>;
  on: (event: string, cb: Function) => void;
  info: { wid: { _serialized: string } };
  sendMessage: ReturnType<typeof mock.fn>;
}

const mockClient: MockClient = {
  events: {},
  on(event, cb) { this.events[event] = cb; },
  info: { wid: { _serialized: '5511999999999@c.us' } },
  sendMessage: mock.fn(async () => ({}))
};

const mockSetAuthStatus = mock.fn();
const mockSetCurrentQR = mock.fn();

function monitorConnectWhatsapp(
  client: any, 
  setAuthStatus: Function, 
  setCurrentQR: Function
) {
  client.on("ready", async () => {
    setAuthStatus(true);
    setCurrentQR("");  
    try {
      const myNumber = client.info.wid._serialized;
      await client.sendMessage(myNumber, "Olá! Bem-vindo. Serei seu assistente.");
    } catch (error) {}
  });

  client.on("disconnected", () => {
    setAuthStatus(false);
  });
}

test('evento ready', async () => {
  monitorConnectWhatsapp(mockClient, mockSetAuthStatus, mockSetCurrentQR);
  await mockClient.events['ready']();

  assert.strictEqual(mockSetAuthStatus.mock.calls[0].arguments[0], true);
  assert.strictEqual(mockSetCurrentQR.mock.calls[0].arguments[0], "");
  assert.strictEqual(mockClient.sendMessage.mock.calls[0].arguments[0], '5511999999999@c.us');
});

test('evento disconnected', () => {
  monitorConnectWhatsapp(mockClient, mockSetAuthStatus, mockSetCurrentQR);
  mockClient.events['disconnected']();

  const call = mockSetAuthStatus.mock.calls.find(c => c.arguments[0] === false);
  assert.ok(call);
});