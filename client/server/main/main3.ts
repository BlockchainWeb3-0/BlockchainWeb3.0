import bodyParser = require("body-parser");
import express = require("express");
import { Request, Response } from "express";
const helmet = require("helmet");
import "dotenv/config";
import cookieParser = require("cookie-parser");
import _ = require("lodash");

import Blockchain from "../blockchain/blockchain";
import { TransactionPool } from "../transactionPool/transactionPool";
import { getBalance, getPublicFromWallet, initWallet } from "../wallet/wallet";
import {
	initP2PServer,
	getSockets,
	connectToPeers,
	broadcastLatest,
} from "../p2p/p2p3";
import { cors } from "./cors";
import user = require("./routes/user");
import {
	Transaction,
	TxFunctions,
	UnspentTxOut,
} from "../transaction/transaction";
import Block from "../blockchain/block";

const blockchain: Blockchain = new Blockchain();
let unspentTxOuts = TxFunctions.processTransactions(
	Block.getGenesisBlock().data,
	[],
	0
);

const app = express();
app.use(helmet());
app.use(cors);
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", user);

export const http_port: number = 3003;

export const p2p_port: number = 6003;

const initHttpServer = (port: number) => {
	app.get("/", (req: Request, res: Response) => {
		res.send("welcome!");
	});

	app.get("/balance", (req: Request, res: Response) => {
		if (unspentTxOuts !== null) {
			const balance = getBalance(getPublicFromWallet(), unspentTxOuts);
			res.send({ balance: balance });
		} else {
			res.status(404).send("Invalid unspentTxOuts");
		}
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

	app.post("/addPeer", (req: Request, res: Response) => {
		const data: string[] = req.body.data;
		connectToPeers(data);
		console.log(data);
		res.send(data);
	});

	app.post("/mineBlock", (req: Request, res: Response) => {
		const data: any = req.body.data;
		console.log("mineBlock", data);
		blockchain.addBlock(data);
		console.log(blockchain);
		broadcastLatest();
		res.send("ok");
	});

	app.post("/mineBlockWithTx", (req: Request, res: Response) => {
		const address: string = req.body.address;
		const amount: number = req.body.amount;
		if (unspentTxOuts !== null) {
			const blockData: Transaction[] = Blockchain.getBlockData(
				address,
				amount,
				blockchain,
				unspentTxOuts
			);
			console.log("@@@@", blockData);

			blockchain.addBlock(blockData);
			broadcastLatest();
			res.send("ok");
		} else {
			console.log("Invalid unspentTxOuts");
			res.status(404).send("Invalid unspentTxOuts");
		}
	});

	app.post("/addtransaction", (req, res) => {
		try {
			const address: string = req.body.address;
			const amount: number = req.body.amount;
			console.log(`address: ${address}`);
			console.log(`amount: ${amount}`);
			res.send(`address: ${address}, amount: ${amount}`);
		} catch (error) {
			res.status(400).send(error);
		}
	});

	// 전체 utxo 불러오기
	app.get("/utxos", (req: Request, res: Response) => {
		if (unspentTxOuts !== null) {
			res.send(Blockchain.getUnspentTxOuts(unspentTxOuts));
		} else {
			res.status(404).send("Invalid unspentTxOuts");
		}
	});

	// 내 지갑주소에 해당하는 utxo 불러오기
	app.get("/myutxos", (req: Request, res: Response) => {
		if (unspentTxOuts !== null) {
			res.send(Blockchain.getMyUnspentTxOutputs(unspentTxOuts));
		} else {
			res.status(404).send("Invalid unspentTxOuts");
		}
	});

	app.get("/transactionPool", (req: Request, res: Response) => {
		console.log(TransactionPool.getTransactionPool());
		res.send(TransactionPool.getTransactionPool());
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
export { app, server, blockchain, unspentTxOuts };
