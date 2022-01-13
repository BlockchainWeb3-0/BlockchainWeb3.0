import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import 'dotenv/config';
import Blockchain from '../blockchain/blockchain';

const blockchain: Blockchain = new Blockchain();

const app = express();
export const http_port: number =
  parseInt(process.env.HTTP_PORT as string) || 3001;

const initHttpServer = (port: number) => {
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('welcome!');
  });

  app.get('/balance', (req, res) => {});

  app.get('/blocks', (request, response) => {
    response.json(blockchain.chain);
  });

  app.get('/transactions', (req, res) => {
    res.send('');
  });

  app.get('/public-key', (request, response) => {});

  app.post('/mineBlock', (req: Request, res: Response) => {
    const data: any = req.body.data;
    console.log('mineBlock', data);
    blockchain.addBlock(data);
    console.log(blockchain);
    res.send('ok');
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
