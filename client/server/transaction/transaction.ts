import * as cryptojs from "crypto-js";
import * as ecdsa from "elliptic";
import * as _ from "lodash";
import * as config from "../config";

const ec = new ecdsa.ec("secp256k1");

class TxOut {
  public address: string;
  public amount: number;

  constructor(address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

class TxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature: string;
}

class Tx {
	public id: string;
	public txIns: TxIn[];
	public txOuts: TxOut[];

	static getTxId = (tx: Tx) => {
    // txIns 안의 모든 내용들을 더함
    const txInContent: string = tx.txIns
    .map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
    .reduce((a, b) => a + b, "");
    
    // txOuts 안의 모든 내용들을 더함
    const txOutContent: string = tx.txOuts
			.map((txOut: TxOut) => txOut.address + txOut.amount)
			.reduce((a, b) => a + b, "");

    return cryptojs.SHA256(txInContent + txOutContent).toString();
  };

  signTxIn = (txInIndex: number, privateKey: string, aUTXOs: UTXO[]): string => {
    const txIn: TxIn = this.txIns[txInIndex];

    const dataToSign = this.id;
    const referencedUTXO: UTXO = findUTXO(txIn.txOutId, txIn.txOutIndex, aUTXOs);
    if(referencedUTXO == null) {
      console.log("Cannot find referenced txOut");
      throw Error();
    }
    const referencedAddress = referencedUTXO.address;

    if (getPublicKey(privateKey) !== referencedAddress) {
      console.log('trying to sign an input with private' +
          ' key that does not match the address that is referenced in txIn');
      throw Error();
  }
    const key = ec.keyFromPrivate(privateKey, "hex");
    const signature: string = toHexString(key.sign(dataToSign).toDER());
    
    return signature;
  }
}

const toHexString = (byteArray: any[]): string => {
  return Array.from(byteArray, (byte: any) => {
    return("0"+(byte & 0XFF).toString(16)).slice(-2);
  }).join('')
}


/**
 * UTXO : Unspent TX Output
 * 트랜잭션 후 남은 Balance 같은 개념
 *  => 다음에 사용할 땐 Input으로 들어감
 */
class UTXO { 
  public readonly txOutId: string;
  public readonly txOutIndex: number;
  public readonly address: string;
  public readonly amount: number;

  constructor(txOutId: string, txOutIndex: number, address: string, amount: number) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }

  UTXOs: UTXO[] = [];
  // static newUTXOs: UTXO[] = newTXs.map((tx) => {

  // })
}

const getTxInAmount = (txIn: TxIn, aUTXOs: UTXO[]): number => {
  return findUTXO(txIn.txOutId, txIn.txOutIndex, aUTXOs).amount;
}

const findUTXO = (txId: string, index: number, aUTXOs: UTXO[]): UTXO => {
  return aUTXOs.find(
		(uTxO) => uTxO.txOutId === txId && uTxO.txOutIndex === index
	);
}


