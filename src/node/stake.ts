import { myWallet } from "./config";

const AMOUNT = process.argv[2];

console.log("Your balance : ", myWallet.balance);

myWallet.stake(Number(AMOUNT));
