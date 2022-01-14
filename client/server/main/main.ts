import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import 'dotenv/config';
import Blockchain from '../blockchain/blockchain';
import { UnspentTxOut } from '../transaction/transaction';
import { getTransactionPool } from '../transactionPool/transactionPool';
import { getPublicFromWallet, initWallet } from '../wallet/wallet';
import { initP2PServer, getSockets, connectToPeers } from '../p2p/p2p';
import Block from '../blockchain/block';
import { cors } from './cors';

const blockchain: Blockchain = new Blockchain();

const app = express();

export const http_port: number =
  parseInt(process.env.HTTP_PORT as string) || 3001;

////////////////////////////////////////
// 최현석 P2P Test
export const p2p_port: number =
  parseInt(process.env.P2P_PORT as string) || 6001;
////////////////////////////////////////

const initHttpServer = (port: number) => {
  app.use(bodyParser.json());
  app.use(cors);
  app.get('/', (req: Request, res: Response) => {
    res.send('welcome!');
  });

  app.get('/balance', (req: Request, res: Response) => {
    const balance: number = 100;
    res.send({ balance: balance });
  });

  app.get('/blocks', (req: Request, res: Response) => {
    res.json(blockchain.chain);
  });

  app.get('/address', (req: Request, res: Response) => {
    const address: string = getPublicFromWallet();
    res.send({ address: address });
  });

  ////////////////////////////////////////
  // 최현석 P2P Test
  app.get('/peers', (req, res) => {
    let sockInfo: string[] = [];
    getSockets().forEach((s: any) => {
      sockInfo.push(s._socket.remoteAddress + ':' + s._socket.remotePort);
      console.log(s._socket);
    });
    res.send(sockInfo);
    //res.send(getSockets());
  });

  app.post('/mineBlock', (req: Request, res: Response) => {
    const data: any = req.body.data;
    console.log('mineBlock', data);
    blockchain.addBlock(data);
    console.log(blockchain);
    res.send('ok');
  });

  app.get('/transactionPool', (req, res) => {
    res.send(getTransactionPool());
  });

  app.post('/addPeer', (req: Request, res: Response) => {
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
initWallet();
export { app, server };
