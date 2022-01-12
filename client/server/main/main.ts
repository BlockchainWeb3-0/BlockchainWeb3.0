import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import "dotenv/config";
import Blockchain from "../blockchain/blockchain";

const app = express();

export const http_port: number =
    parseInt(process.env.HTTP_PORT as string) || 3001;

const initHttpServer = (port: number) => {
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
        res.send("welcome!");
    });

    app.get("/blocks", (req: Request, res: Response) => {
        const bc = new Blockchain().chain;
        res.send(bc);
    });
};

const server = app.listen(http_port, () => {
    console.log(`
    ####################################
    🛡️  Server listening on port: 3001🛡️
    ####################################`);
});

initHttpServer(http_port);

export { app, server };
