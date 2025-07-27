import WebSocket from "ws";

import { ME } from "../../node/config";

const address = "ws://" + ME.host + ":" + ME.port;

const Connect = new WebSocket(address);

Connect.on("open", () => {
  //waitconsole.log("Connect to " + address);
});

Connect.on("error", () => {
  //waitmaintenanceconsole.log("Failed to connected to " + address + " retrying...");
});

export default Connect;
