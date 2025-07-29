import * as crypto from "crypto";

class Block {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
  minerUptime: number;

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
    this.minerUptime = 0;
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
          this.minerUptime
      )
      .digest("hex");
  }
}

export default Block;
