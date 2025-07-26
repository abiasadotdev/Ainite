import Ainite from "./src/core";

import { myWallet } from "./src/node/config";

Ainite.createTransaction("Transfer", "a", "b", 1, "Beli sepatu");

Ainite.mineMemPool("c");

console.log(Ainite.getBalance("a"));

console.log(Ainite.chain);
