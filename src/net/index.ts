import fs from "fs";

import { WebSocketServer } from "ws";

import Broadcast from "./broadcast";

import Ainite from "../core";

const configFile = fs.readFileSync("./src/node/config.json", "utf-8");

const config = JSON.parse(configFile);

const Network = () => {
  const network = new WebSocketServer({ port: config.port });

  network.on("connection", (ws) => {
    ws.on("message", (msg: any) => {
      const data = JSON.parse(msg.toString());

      switch (data.event) {
        case "registerNode":
          config.nodes.push(data.data);

          fs.writeFileSync("./src/node/config.json", JSON.stringify(config));

          config.nodes.forEach((node: any) => {
            if (node.host !== data.data.host) {
              Broadcast("receiveNode", config.nodes);
            }
          });

          console.log("Node registered.", data.data, "\n");
          break;

        case "receiveNode":
          data.data.forEach((nodeData: any) => {
            const nodeValidation = config.nodes.find(
              (node: any) => node.host == nodeData.host
            );

            if (!nodeValidation) {
              config.nodes.push(nodeData);

              fs.writeFileSync(
                "./src/node/config.json",
                JSON.stringify(config)
              );
            }
          });

          console.log("New node received.", data.data, "\n");
          break;

        case "syncBlock":
          ws.send(JSON.stringify(Ainite.chain));
          break;

        case "createTransaction":
          const { type, from, to, amount, messages } = data.data;

          Ainite.createTransaction(type, from, to, amount, messages);

          Broadcast("receiveTransaction", data.data);

          console.log("\n\nNew transaction. TX : ", data.data, "\n");

          ws.send("Transaction created and added to Mem Pool.");

          break;

        case "receiveTransaction":
          const { rtype, rfrom, rto, ramount, rmessages } = data.data;

          Ainite.createTransaction(rtype, rfrom, rto, ramount, rmessages);

          console.log("\n\nNew transaction received from", data.data, "\n");

          break;

        case "receiveBlock":
          Ainite.chain.push(data.data);

          console.log("\n\nBlock received " + data.data, "\n");
      }
    });
  });

  network.on("error", (error) => console.log(error));
};

export default Network;
