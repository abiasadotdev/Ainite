import readline from "readline";

import Network from "./net";

import API from "./api";

import Broadcast from "./net/broadcast";

import Ainite from "./core";

import Setup from "./node/setup";

import { ME, myWallet } from "./node/config";

const HOST = process.argv[2];

const PORT = Number(process.argv[3]);

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('WELCOME TO AINITE CLI\nInput "menu" for view menu list.');

const cli = () => {
  read.question("Menu : ", (menu) => {
    switch (menu) {
      case "menu":
        console.log(
          "- setup : Setup your node\n- start : Runing your node\n- api : Open your API server (maintenance)\n- node : View your node info\n- myWallet : View your wallet info\n- autoMining : Enable auto mining\n- off : Shutdown your node and close CLI"
        );

        cli();

        break;

      case "setup":
        read.question("Input your IP : ", (ip) => {
          ME.host = ip;

          read.question("Input your port : ", (port) => {
            ME.port = Number(port);

            Broadcast("registerNode", { host: ME.host, port: ME.port });

            console.log("Setup successfully.");

            cli();
          });
        });

        break;

      case "start":
        Network();

        console.log("Your node is ruuning.");

        cli();

        break;

      case "api":
        API();

        console.log("Your node API is open.");

        cli();

        break;

      case "node":
        console.log(ME);

        cli();

        break;

      case "myWallet":
        console.log(myWallet);

        cli();

        break;

      case "autoMining":
        setInterval(() => {
          if (Ainite.memPool.length > 0) {
            const block = Ainite.mineMemPool(myWallet.publicKey);

            if (block !== false) {
              Broadcast("receiveBlock", block);
            }
          }
        }, 25000);

        console.log("Auto mining is enable.");

        cli();

        break;

      case "off":
        console.log("Shutdown node...");

        read.close();

        process.exit(0);

        break;

      default:
        console.log("Invalid menu.");

        cli();
    }
  });
};

cli();
