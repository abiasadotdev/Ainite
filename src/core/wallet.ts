import * as crypto from "crypto";

import Ainite from "./index";

import { priBase64, pubBase64 } from "./base64";

const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1",
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

class Wallet {
  privateKey: string;
  publicKey: string;
  balance: number;
  //deletebalance: number;

  constructor() {
    this.privateKey = priBase64(privateKey);
    this.publicKey = pubBase64(publicKey);
    this.balance = 0;
    //deletethis.balance = 0;
  }
}

export default Wallet;
