import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import "dotenv/config";
import { getBlockchain } from "../blockchain/blockchain";

const app = express();

export const http_port: number =
    parseInt(process.env.HTTP_PORT as string) || 3001;

const initHttpServer = (port: number) => {
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
        res.send("welcome!");
    });

    app.get("/blocks", (req: Request, res: Response) => {
        res.send(getBlockchain());
    });
};

app.listen(http_port, () => {
    console.log(`
    ####################################
    🛡️  Server listening on port: 1234🛡️
    ####################################`);
});

initHttpServer(http_port);

export { app };
