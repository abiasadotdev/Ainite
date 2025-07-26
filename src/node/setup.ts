import { ME } from "./config";

import Broadcast from "../net/broadcast";

const Setup = (host: string, port: number, stake: number) => {
  console.log("Setup starting...");

  ME.host = host;

  ME.port = port;

  ME.stakedAmount += stake;

  Broadcast("registerNode", { host: ME.host, port: ME.port });

  console.log("Setup successfully.");
};

export default Setup;
