import fs from "fs";

import os from "os";

import Block from "./block";

import Transaction from "./transaction";

const chainFile = fs.readFileSync("./src/storage/chain.json", "utf-8");

const chain = JSON.parse(chainFile);

const publicKey = fs.readFileSync("./src/wallet/key.txt", "utf-8");

class Blockchain {
  chain: any;
  memPool: Transaction[];
  uptime: number;

  constructor() {
    try {
      const chainData = chain.chain;
      this.chain = Array.isArray(chainData) ? chainData : [];
    } catch {
      this.chain = [];
    }

    this.memPool = [];
    this.uptime = 50000;

    if (this.chain.length < 1) {
      this.createGenesisBlock();
    }
  }

  pushBlock(block: any) {
    this.chain.push(block);

    fs.writeFileSync(
      "./src/storage/chain.json",
      JSON.stringify(this.chain, null, 2)
    );
  }

  createGenesisBlock() {
    const block = new Block(
      0,
      Date.now(),
      [
        new Transaction(
          "Genesis",
          "system",
          publicKey,
          1000,
          "Mine genesis block"
        ),
      ],

      "0"
    );

    this.chain.push(block);

    fs.writeFileSync(
      "./src/storage/chain.json",
      JSON.stringify(this.chain, null, 2)
    );

    return block;
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

  mineMemPool(miner: string) {
    if (os.uptime() > this.uptime) {
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

      chain.chain.push(block);

      fs.writeFileSync("./storage/chain.json", JSON.stringify(chain));

      console.log("Mempool successfully mined.");

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

  getBalance(address: string) {
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
