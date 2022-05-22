interface WsInitiator<TU = string> {
  action: string;
  uuid: TU;
}

interface WsReply<TU = string> {
  name: "CUMCORD_WEBSOCKET";
  uuid: TU;
}

type WsResult = [number, WsReply];

let lastId = 0;
const getId = () => Math.random().toString(36) + lastId++;

const promisifyWsWithTimeout = (ws: WebSocket, id: string) =>
  new Promise<WsReply>((res, rej) => {
    ws.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data);
        if (parsed?.uuid === id && parsed.name === "CUMCORD_WEBSOCKET")
          res(parsed);
      } catch {}
    };
    setTimeout(rej, 5000);
  });

// noinspection JSUnusedGlobalSymbols
export default async (action: string, payload?: object) => {
  const promises: Promise<WsResult>[] = [];

  for (let i = 6463; i <= 6473; i++) {
    const ws = new WebSocket(`ws://127.0.0.1:${i}/cumcord`);

    const msg: WsInitiator = { ...payload, uuid: getId(), action };

    ws.onopen = () => {
      ws.send(JSON.stringify(msg));

      promises.push(
        promisifyWsWithTimeout(ws, msg.uuid).then((r) => {
          ws.close();
          return [i, r];
        })
      );
    };
  }

  // give the WS time
  await new Promise((res) => setTimeout(res, 500));

  return await Promise.all(promises);
};
