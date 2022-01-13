import {ec} from "elliptic";
import fs from "fs";
import * as _ from "lodash";

const EC = new ec('secp256k1');
const privateKeyLocation = process.env.PRIVATE_KEY || "node/wallet/private_key";

export default class Wallet {
  static getPrivateFromWallet = (): string => {
    const buffer = fs.readFileSync(privateKeyLocation, "utf8");
    return buffer.toString();
  }

  static getPulicFromWallet = (): string => {
    const privateKey = this.getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, "hex");
    return key.getPublic().encode("hex", false)
  }

  static generatePrivateKey = (): string => {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  }

  static initWallet = () => {
    if(fs.existsSync(privateKeyLocation)) {
      return;
    }
    const newPrivateKey = this.generatePrivateKey();

    fs.writeFileSync(privateKeyLocation, newPrivateKey);
    console.log("new wallet with private key created to : %s", privateKeyLocation);
  }

  static deleteWallet = () => {
    if(fs.existsSync(privateKeyLocation)) {
      fs.unlinkSync(privateKeyLocation);
    }
  }

  // static getBalance = (address: string, UTXOs: UTXO[]): number => {
  //   return _(findUTXOs(address, UTXOs)).map((UTXO: UTXO)=>UTXO.amount).sum();
  // }
}


