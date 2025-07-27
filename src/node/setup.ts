import { ME } from "./config";

import Broadcast from "../net/broadcast";

const Setup = (host: string, port: number) => {
  console.log("Setup starting...");

  ME.host = host;

  ME.port = port;

  Broadcast("registerNode", { host: ME.host, port: ME.port });

  console.log("Setup successfully.");

  console.log(ME.uptime);
};

export default Setup;
