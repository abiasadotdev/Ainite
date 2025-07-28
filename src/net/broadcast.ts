import fs from "fs";

import WebSocket from "ws";

import Message from "./message";

const configFile = fs.readFileSync("./src/node/config.json", "utf-8");

const config = JSON.parse(configFile);

const Broadcast = (event: string, data: any) => {
  const message = new Message(event, data);

  config.nodes.forEach((node: any) => {
    if (node.ip !== config.ip) {
      const address = "ws://" + node.ip + ":" + node.port;

      const broadcast = new WebSocket(address);

      broadcast.on("open", () => {
        broadcast.send(JSON.stringify({ event: event, data: data }));
      });

      broadcast.on("error", () => {
        setInterval(() => {
          Broadcast(event, data);
        }, 10000);
      });
    }
  });
};

export default Broadcast;
