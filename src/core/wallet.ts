import * as crypto from "crypto";

import Ainite from "./index";

import { priBase64, pubBase64 } from "./base64";

const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1",
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

class Wallet {
  balance: number;
  privateKey: string;
  publicKey: string;
  stakedBalance: number;

  constructor() {
    this.privateKey = priBase64(privateKey);
    this.publicKey = pubBase64(publicKey);
    this.balance = Ainite.getBalance(this.publicKey);
    this.stakedBalance = 0;
  }

  stake(amount: number) {
    const balance = Ainite.getBalance(this.publicKey);

    if (balance < amount) {
      console.log("Your balance is low.");

      return;
    }

    this.stakedBalance += amount;

    console.log(amount + " $Ainite Successfully staked.");
  }
}

export default Wallet;
