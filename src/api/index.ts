import express from "express";

import cors from "cors";

import { ME } from "../node/config";

import { getBlocks } from "./controllers/blockControllers";

import { createTransaction } from "./controllers/transactionControllers";

const app = express();

const port = 8000;

const API = () => {
  app.use(express.json());

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.get("/blocks", getBlocks);

  app.post("/createTransaction", createTransaction);

  app.listen(port, () => {
    //waitconsole.log(`API runing on http://${ME.host}:${port}`);
  });
};

export default API;
