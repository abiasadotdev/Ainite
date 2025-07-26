import * as crypto from "crypto";

import Ainite from "./index";

import { priBase64, pubBase64 } from "./base64";

class Wallet {
  balance: number;
  privateKey: string;
  publicKey: string;

  constructor() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "secp256k1",
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    this.privateKey = priBase64(privateKey);
    this.publicKey = pubBase64(publicKey);
    this.balance = 0;
  }
}

export default Wallet;
