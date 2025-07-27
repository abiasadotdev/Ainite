import Wallet from "../core/wallet";

import os from "os";

const ME = { host: "192.168.100.5", port: 2025, uptime: os.uptime() };

const SEED = { host: "192.168.100.5", port: 2025 };

//newseedconst SEED = { host: "192.168.100.85", port: 2026 };

const NODES = [SEED];

const myWallet = new Wallet();

export { ME, SEED, NODES, myWallet };
