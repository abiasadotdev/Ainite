import Wallet from "../core/wallet";

const ME = { host: "192.168.100.5", port: 2025, stakedAmount: 0 };

const SEED = { host: "localhost", port: 2025 };

const NODES = [SEED];

const myWallet = new Wallet();

export { ME, SEED, NODES, myWallet };
