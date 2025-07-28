import fs from "fs";

const keyFile = fs.readFileSync("./src/wallet/key.json", "utf-8");

const key = JSON.parse(keyFile);

import Wallet from "./wallet";

let myWallet = new Wallet(key.key);

const createWallet = (pass: string) => {
  key.key = pass;

  fs.writeFileSync("./src/wallet/key.json", JSON.stringify(key));

  myWallet = new Wallet(pass);
};

export { myWallet, createWallet };
