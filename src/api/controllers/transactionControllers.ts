import Connect from "./wsConnection";

import Messages from "../../net/message";

const createTransaction = (req: any, res: any) => {
  const { type, from, to, amount, messages } = req.body;

  const msg = new Messages("createTransaction", {
    type,
    from,
    to,
    amount,
    messages,
  });

  Connect.send(JSON.stringify(msg));

  const send = (msg: any) => {
    if (!res.headersent) {
      const data = msg.toString();

      res.json({ messages: data });
    }

    Connect.off("message", send);
  };

  Connect.on("message", send);
};

export { createTransaction };
