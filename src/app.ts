import Network from "./net";

import Broadcast from "./net/broadcast";

import Ainite from "./core";

import Setup from "./node/setup";

import { ME, myWallet } from "./node/config";

const HOST = process.argv[2];

const PORT = Number(process.argv[3]);

Setup(HOST, PORT);

Network();

console.log("Your private key : ", myWallet.privateKey);

console.log("Your public key : ", myWallet.publicKey);

setInterval(() => {
  if (Ainite.memPool.length > 0) {
    const block = Ainite.mineMemPool(myWallet.publicKey);

    if (block !== false) {
      Broadcast("receiveBlock", block);
    }
  } else {
    console.log("Waiting transaction...");

    console.log("Your balance : ", Ainite.getBalance(myWallet.publicKey));
  }
}, 30000);
