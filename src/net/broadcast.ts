import WebSocket from "ws";

import { NODES } from "../node/config";

import { ME } from "../node/config";

import Message from "./message";

const Broadcast = (event: string, data: any) => {
  const message = new Message(event, data);

  NODES.forEach((node) => {
    if (node.host !== ME.host) {
      const address = "ws://" + node.host + ":" + node.port;

      const broadcast = new WebSocket(address);

      broadcast.on("open", () => {
        broadcast.send(JSON.stringify({ event: event, data: data }));
      });

      broadcast.on("error", () => {
        console.log("Some node is off, retrying...");

        Broadcast(event, data);
      });
    }
  });
};

export default Broadcast;
