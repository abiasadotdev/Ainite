import { WebSocketServer } from "ws";

import { ME, NODES } from "../node/config";

import Broadcast from "./broadcast";

import Ainite from "../core";

const Network = () => {
  const network = new WebSocketServer({ port: ME.port });

  network.on("connection", (ws) => {
    ws.on("message", (msg: any) => {
      const data = JSON.parse(msg.toString());

      switch (data.event) {
        case "registerNode":
          NODES.push(data.data);

          NODES.forEach((node) => {
            if (node.host !== data.data.host) {
              Broadcast("receiveNode", NODES);
            }
          });

          console.log("Node registered.", data.data);
          break;

        case "receiveNode":
          console.log(data.data.data);
          data.data.data.forEach((nodeData: any) => {
            const nodeValidation = NODES.find(
              (node: any) => node.host == nodeData.host
            );

            if (!nodeValidation) {
              NODES.push(nodeData);
            }
          });

          console.log("New node received.", data.data);
          break;

        case "syncBlock":
          ws.send(JSON.stringify(Ainite.chain));
          break;

        case "createTransaction":
          const { type, from, to, amount, messages } = data.data;

          Ainite.createTransaction(type, from, to, amount, messages);

          Broadcast("receiveTransaction", data.data);

          console.log(
            "New transaction created and added to Mem Pool",
            data.data
          );

          ws.send("Trensaction created and added to Mem Pool.");

          break;

        case "receiveTransaction":
          const { rtype, rfrom, rto, ramount, rmessages } = data.data;

          Ainite.createTransaction(rtype, rfrom, rto, ramount, rmessages);

          console.log(
            "New transaction received from " +
              data.from +
              " and added to Mem Pool",
            data.data
          );

          break;

        case "receiveBlock":
          Ainite.chain.push(data.data);

          console.log("Block received from " + data.from, data.data);
      }
    });
  });

  network.on("error", (error) => console.log(error));

  //waitconsole.log("Network running. Address : ws://" + ME.host + ":" + ME.port);
};

export default Network;
