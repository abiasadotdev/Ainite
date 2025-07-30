import fs from "fs";

import chalk from "chalk";

const key = fs.readFileSync("./src/wallet/key.txt");

import Ainite from "../core";

const transfer = (address: string, amount: number, messages: string) => {
  if (Ainite.getBalance(key.toString()) < amount) {
    console.log(chalk.red("Insufficient balance."));

    return;
  }

  Ainite.createTransaction(
    "Transfer",
    key.toString(),
    address,
    amount,
    messages
  );

  console.log(chalk.blue("Transfer success."));

  return;
};

export default transfer;
