import fs from "fs";

import * as crypto from "crypto";

import chalk from "chalk";

const createWallet = (seed: string) => {
  const publicKey = crypto.createHash("sha256").update(seed).digest("hex");

  fs.writeFileSync("./src/wallet/key.txt", publicKey);

  console.log(chalk.dim("Wallet created."));

  return publicKey;
};

export default createWallet;
