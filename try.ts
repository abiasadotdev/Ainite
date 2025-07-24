import Ainite from "./src/core";

Ainite.createTransaction("Transfer", "a", "b", 1, "Beli sepatu");

Ainite.mineMemPool("c");

setTimeout(() => {
  console.log(Ainite.chain);
}, 2000);
