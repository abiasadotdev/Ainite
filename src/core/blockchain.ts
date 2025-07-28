import fs from "fs";

import os from "os";

import Block from "./block";

import Transaction from "./transaction";

import Broadcast from "../net/broadcast";

import { myWallet } from "../wallet";

const storageFile = fs.readFileSync("./src/storage/storage.json", "utf-8");

const storage = JSON.parse(storageFile);

class Blockchain {
  chain: any;
  memPool: any;
  difficulty: number;

  constructor() {
    this.chain = [];
    this.memPool = [];
    this.difficulty = 4;

    setTimeout(() => {
      if (this.chain.length < 1) {
        this.chain.push(this.createGenesisBlock());
      }
    }, 10000);
  }

  createGenesisBlock() {
    return new Block(
      0,
      Date.now(),
      [
        new Transaction(
          "Genesis",
          "system",
          myWallet.publicKey,
          1000,
          "Mine genesis block"
        ),
      ],
      "0"
    );
  }

  createTransaction(
    type: string,
    from: string,
    to: string,
    amount: number,
    messages: string
  ) {
    const tx = new Transaction(type, from, to, amount, messages);

    this.memPool.push(tx);

    return "Transaction created and added to Mem Pool";
  }

  mineMemPool(miner: any) {
    if (os.uptime() > 50000) {
      const tx = new Transaction(
        "Mining reward",
        "system",
        miner,
        1500,
        "Mining reward"
      );

      this.memPool.push(tx);

      const block = new Block(
        this.getLatestBlock().index + 1,
        Date.now(),
        this.memPool,
        this.getLatestBlock().hash
      );

      this.chain.push(block);

      console.log("MemPool successfully mined.");

      this.memPool = [];

      return block;
    } else {
      console.log("Your node uptime is low.");

      return false;
    }
  }

  chainValidation() {
    for (let i = 1; i < this.chain.length; i++) {
      const previousBlock = this.chain[i - 1];

      const lastBlock = this.chain[i];

      if (lastBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (lastBlock.index !== previousBlock.index + 1) {
        return false;
      }

      return true;
    }
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getBalance(address: any) {
    let balance = 0;

    for (const block of this.chain) {
      for (const tx of block.data) {
        if (tx.from === address) {
          balance -= tx.amount;
        }

        if (tx.to === address) {
          balance += tx.amount;
        }
      }
    }

    return balance;
  }
}

export default Blockchain;
