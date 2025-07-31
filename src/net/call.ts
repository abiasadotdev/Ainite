import WebSocket from "ws";

const call = (host: string, port: number, event: string, data: object) => {
  const address = "ws://" + host + ":" + port;

  const calling = new WebSocket(address);

  calling.on("connection", () => {
    calling.send(JSON.stringify({ event: event, data: data }));
  });

  calling.on("error", (error) => {
    console.log("Failed calling " + address + " retrying...");

    setInterval(() => {
      call(host, port, event, data);
    }, 15000);
  });
};

export default call;
