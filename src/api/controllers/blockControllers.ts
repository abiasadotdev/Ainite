import Connect from "./wsConnection";

import Messages from "../../net/message";

const getBlocks = (req: any, res: any) => {
  //1const messages = new Messages('syncBlock', JSON.parse(req.body))

  const messages = new Messages("syncBlock", {});

  Connect.send(JSON.stringify(messages));

  const send = (msg: any) => {
    if (!res.headersent) {
      const data = JSON.parse(msg);

      res.json({ block_height: data.length, blocks: data });
    }

    Connect.off("message", send);
  };

  Connect.on("message", send);
};

export { getBlocks };
