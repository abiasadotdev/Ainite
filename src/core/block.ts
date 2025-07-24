import * as crypto from "crypto";

class Block {
  index: number;
  timestamp: number;
  data: object;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(
    index: number,
    timestamp: number,
    data: object,
    previousHash: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.createHash();
    this.nonce = 0;
  }

  createHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash +
          this.hash +
          this.nonce
      )
      .digest("hex");
  }

  async mine(difficulty: number, miningStatus: () => boolean) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      if (!miningStatus) {
        console.log("Mining stopped.");

        return;
      }

      this.nonce++;

      this.hash = this.createHash();

      console.log(`Block is being mining. Current nonce : ${this.nonce}`);

      await new Promise((resolve) => setImmediate(resolve));
    }

    console.log("Block successfully mined.", this.hash);
  }
}

export default Block;
