import fs from "fs";

import readline from "readline";

import chalk from "chalk";

import os from "os";

import Ainite from "../core";

import Network from "../net";

import call from "../net/call";

import createWallet from "../wallet/createWallet";

import transfer from "../wallet/transfer";

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configFile = fs.readFileSync("./src/node/config.json", "utf-8");

const keyFile = fs.readFileSync("./src/wallet/key.txt", "utf-8");

const myConfig = JSON.parse(configFile);

console.log(chalk.bgBlue.bold("Welcome To Ainite CLI"));

console.log(chalk.blue('\nInput "menu" for view list menu.'));

const CLI = () => {
  if (myConfig.host.length < 1) {
    console.log(chalk.dim("Setup started..."));

    myConfig.host = os.networkInterfaces()["Wi-Fi"]?.[3].address;

    fs.writeFileSync(
      "./src/node/config.json",
      JSON.stringify(myConfig, null, 2)
    );

    call(myConfig.seed.host, myConfig.seed.port, "registerNode", {
      host: myConfig.host,
      port: myConfig.port,
    });

    console.log(chalk.dim("Your node successfully setup."));
  }

  if (keyFile.length == 0) {
    console.log(chalk.dim("Let's create your wallet."));

    read.question(
      chalk.blue("Create seed (you must remember it!) : "),
      (seed) => {
        createWallet(seed);

        console.log(chalk.dim("Start again your node."));

        process.exit(0);
      }
    );
  }

  read.question(chalk.blue("\nMenu : "), (menu) => {
    switch (menu) {
      case "menu":
        console.log(
          chalk.blue(
            "- start : Running your node\n- wallet : View your wallet information\n- newWallet : Create new wallet\n- transfer : Transfer your coin\n- autoMining : Enable auto mining\n- off : Shutdown your node"
          )
        );

        CLI();

        break;

      case "start":
        Network();

        console.log(chalk.dim("🔌 Your node is running."));

        CLI();

        break;

      case "wallet":
        console.log(
          chalk.blue("\n🔑 Your publicKey :"),
          chalk.bold.blue(keyFile),
          chalk.blue("\n🪙 Your balance : "),
          Ainite.getBalance(keyFile)
        );

        CLI();

        break;

      case "newWallet":
        read.question(
          chalk.blue("\nCreate seed (you must remember it!) :"),
          (pass) => {
            createWallet(pass);

            CLI();
          }
        );

        break;

      case "transfer":
        read.question(chalk.blue("Address : "), (address) => {
          read.question(chalk.blue("Amount : "), (amount) => {
            read.question(chalk.blue("Messages : "), (messages) => {
              transfer(address, Number(amount), messages);
              console.log(Ainite.memPool);
              CLI();
            });
          });
        });
        break;

      case "autoMining":
        console.log(chalk.dim("Auto mining enable."));

        setInterval(() => {
          if (Ainite.memPool.length >= 1) {
            Ainite.mineMemPool(keyFile);
            return;
          }

          console.log(chalk.dim("No transaction in mem pool."));

          return;
        }, 22000);

        CLI();

        break;

      case "off":
        console.log(chalk.dim("Shutdown..."));

        process.exit(0);

        break;

      default:
        console.log(chalk.dim("Invalid menu."));

        CLI();
    }
  });
};

CLI();
