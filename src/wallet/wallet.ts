import crypto from "crypto";

class Wallet {
  pass: string;
  publicKey: string;

  constructor(pass: string) {
    const passHash = crypto.createHash("sha256").update(pass).digest("hex");

    this.pass = pass;

    this.publicKey = passHash;
  }
}

export default Wallet;
