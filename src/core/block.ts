import * as crypto from "crypto";

import { myWallet } from "../node/config";

class Block {
  index: number;
  timestamp: number;
  data: any;
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
}

export default Block;
