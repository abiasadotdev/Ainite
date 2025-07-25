import Network from "./net";

import Broadcast from "./net/broadcast";

import Ainite from "./core";

import Setup from "./node/setup";

import { ME } from "./node/config";

const HOST = process.argv[2];

const PORT = Number(process.argv[3]);

Setup(HOST, PORT);

Network();

setInterval(() => {
  if (Ainite.memPool.length > 0) {
    const block = Ainite.mineMemPool(ME.port.toString());

    Broadcast("receiveBlock", block);
  } else {
    console.log("Waiting transaction...");
  }
}, 60000);
