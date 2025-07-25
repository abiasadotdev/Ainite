import Block from "./block";

import Transaction from "./transaction";

class Blockchain {
  chain: Block[];
  memPool: Transaction[];
  difficulty: number;
  miningStatus: boolean;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.memPool = [];
    this.difficulty = 4;
    this.miningStatus = false;
  }

  createGenesisBlock() {
    return new Block(
      0,
      Date.now(),
      new Transaction("Genesis", "system", "system", 0, "Genesis block"),
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

  mineMemPool(miner: string) {
    this.miningStatus = false;

    const block = new Block(
      this.getLatestBlock().index + 1,
      Date.now(),
      this.memPool,
      this.getLatestBlock().hash
    );

    block.mine(this.difficulty, () => this.miningStatus);

    this.chain.push(block);

    this.memPool = [
      new Transaction("Mining reward", "system", miner, 20, "Mining reward"),
    ];

    return block;
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

  endMining() {
    this.miningStatus = false;

    console.log("Mining stoped.");
  }
}

export default Blockchain;
