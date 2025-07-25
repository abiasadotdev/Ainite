import { WebSocketServer } from "ws";

import { ME } from "../node/config";

import Nodes from "../node/nodeList";

import Broadcast from "./broadcast";

import Ainite from "../core";

const Network = () => {
  const network = new WebSocketServer({ port: ME.port });

  network.on("connection", (ws) => {
    ws.on("message", (msg: any) => {
      const data = JSON.parse(msg.toString());

      switch (data.event) {
        case "registerNode":
          Nodes.push(data.data);

          Nodes.forEach((node) => {
            if (node.port !== data.data.port) {
              Broadcast("receiveNode", Nodes);
            }
          });

          console.log("Node registered.", data.data);
          break;

        case "receiveNode":
          data.data.forEach((nodeData: any) => {
            const nodeValidation = Nodes.find(
              (node: any) => node.port == nodeData.port
            );

            if (!nodeValidation) {
              Nodes.push(nodeData);
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
            "New transaction received" + data.from + " and added to Mem Pool",
            data.data
          );

          break;

        case "receiveBlock":
          Ainite.endMining();

          Ainite.chain.push(data.data);

          console.log("Block received from " + data.from, data.data);
      }
    });
  });

  network.on("error", (error) => console.log(error));

  console.log("Network running. Address : ws://" + ME.host + ":" + ME.port);
};

export default Network;
