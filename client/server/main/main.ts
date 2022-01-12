import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import "dotenv/config";
import Blockchain from "../blockchain/blockchain";
import { initP2PServer, getSockets, connectToPeers } from "../p2p/p2p";
import Block from "../blockchain/block";

const app = express();

const bc = new Blockchain();

export const http_port: number =
    parseInt(process.env.HTTP_PORT as string) || 3001;

////////////////////////////////////////
// 최현석 P2P Test
export const p2p_port: number =
    parseInt(process.env.P2P_PORT as string) || 6001;
////////////////////////////////////////

const initHttpServer = (port: number) => {
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
        res.send("welcome!");
    });

    app.get("/blocks", (req: Request, res: Response) => {
        res.send(bc);
    });
    ////////////////////////////////////////
    // 최현석 P2P Test
    app.get("/peers", (req, res) => {
        let sockInfo: string[] = [];
        getSockets().forEach((s: any) => {
            sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
            console.log(s._socket);
        });
        res.send(sockInfo);
        //res.send(getSockets());
    });

    app.post("/mineBlock", (req, res) => {
        const data = req.body.data || [];
        bc.addBlock(data);

        res.send(bc);
    });

    app.post("/addPeer", (req: Request, res: Response) => {
        const data: string[] = req.body.data;
        connectToPeers(data);
        console.log(data);
        res.send(data);
    });
    ////////////////////////////////////////
};

const server = app.listen(http_port, () => {
    console.log(`
    ####################################
    🛡️  Server listening on port: ${http_port}🛡️
    ####################################`);
});

initHttpServer(http_port);
////////////////////////////////////////
// 최현석 P2P Test
initP2PServer(p2p_port);

////////////////////////////////////////

export { app, server };
