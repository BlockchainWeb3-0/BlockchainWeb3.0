import bodyParser = require("body-parser");
import express = require("express");
import { Request, Response } from "express";
const helmet = require("helmet");
import "dotenv/config";

import Blockchain from "../blockchain/blockchain";
import { getTransactionPool } from "../transactionPool/transactionPool";
import { getPublicFromWallet, initWallet } from "../wallet/wallet";
import {
    initP2PServer,
    getSockets,
    connectToPeers,
    broadcastLatest,
} from "../p2p/p2p3";
import { cors } from "./cors";
import user = require("./routes/user");

const blockchain: Blockchain = new Blockchain();

const app = express();
app.use(helmet());
app.use(cors);
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user", user);

export const http_port: number = 3003;

export const p2p_port: number = 6003;

const initHttpServer = (port: number) => {
    app.get("/", (req: Request, res: Response) => {
        res.send("welcome!");
    });

    app.get("/balance", (req: Request, res: Response) => {
        const balance: number = 100;
        res.send({ balance: balance });
    });

    app.get("/blocks", (req: Request, res: Response) => {
        res.json(blockchain.chain);
    });

    app.get("/address", (req: Request, res: Response) => {
        const address: string = getPublicFromWallet();
        res.send({ address: address });
    });

    app.get("/peers", (req, res) => {
        let sockInfo: string[] = [];
        getSockets().forEach((s: any) => {
            sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
        });
        console.log(sockInfo);
        res.send(sockInfo);
    });

    app.post("/mineBlock", (req: Request, res: Response) => {
        const data: any = req.body.data;
        console.log("mineBlock", data);
        blockchain.addBlock(data);
        console.log(blockchain);
        broadcastLatest();
        res.send("ok");
    });

    app.get("/transactionPool", (req, res) => {
        console.log(getTransactionPool());

        res.send(getTransactionPool());
    });

    app.post("/addPeer", (req: Request, res: Response) => {
        const data: string[] = req.body.data;
        connectToPeers(data);
        console.log(data);
        res.send(data);
    });
    ////////////////////////////////////////
};
initHttpServer(http_port);

const server = app.listen(http_port, () => {
    console.log(`
    ####################################
    🛡️  Server listening on port: ${http_port}🛡️
    ####################################`);
});

initP2PServer(p2p_port);

initWallet();
export { app, server, blockchain };