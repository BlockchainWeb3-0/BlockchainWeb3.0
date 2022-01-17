import cryptojs = require("crypto-js");
import _ from 'lodash';
import ecdsa = require("elliptic");
import { hasDuplicates } from "./transaction";

const ec = new ecdsa.ec("secp256k1");

const COINBASE_AMOUNT: number = 50;

class Utxo {
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
}

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

class Transaction {
  public id: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];
}

class TxFunctions {
	// id : transaction 안의 내용을 hash로 만든 것
	static getTransactionId = (transaction: Transaction): string => {
		const txInContent: string = transaction.txIns
			// TxIn안의 내용을 다 더함
			.map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
			// 다 더한 TxIn들을 다시 다 더함
			.reduce((a, b) => a + b, "");

		const txOutContent: string = transaction.txOuts
			// TxOut안의 내용을 다 더함
			.map((txOut: TxOut) => txOut.address + txOut.amount)
			// 다 더한 TxOut들을 다시 다 더함
			.reduce((a, b) => a + b, "");

		return cryptojs.SHA256(txInContent + txOutContent).toString();
	};

	static validateTransaction = (
		transaction: Transaction,
		aUtxos: Utxo[]
	): boolean => {
		// transaction의 id와 계산값을 비교
		if (this.getTransactionId(transaction) !== transaction.id) {
			console.log("Invalid tx id: ", transaction.id);
			return false;
		}

		// txIns 안의 txIn들 검증
		const hasValidTxIns: boolean = transaction.txIns
			.map((txIn) => this.validateTxIn(txIn, transaction, aUtxos))
			.reduce((a, b) => a && b, true);

		if (!hasValidTxIns) {
			console.log("Invalid txIn found: ", transaction.id);
			return false;
		}

		// txIn 값의 합
		const totalTxInValues: number = transaction.txIns
			.map((txIn) => getTxInAmount(txIn, aUtxos))
			.reduce((a, b) => a + b, 0);

		// txOut 값의 합
		const totalTxOutValues: number = transaction.txOuts
			.map((txOut) => txOut.amount)
			.reduce((a, b) => a + b, 0);

		// input의 총합과 output의 총합이 같은지 검증
		if (totalTxInValues !== totalTxOutValues) {
			console.log(
				"totalTxInValues !== totalTxOutValues in tx: ",
				transaction.id
			);
			return false;
		}

		return true;
	};

	static validateTxIn = (
		txIn: TxIn,
		transaction: Transaction,
		aUtxos: Utxo[]
	): boolean => {
		// txIn이 unspent인지 확인(?)
		const referencedUtxo: Utxo | undefined = aUtxos.find(
			(utxo) => utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex
		);
		if (referencedUtxo == undefined) {
			console.log("Referenced txOut not found: ");
			return false;
		}
		const address = referencedUtxo.address;

		// public key를 이용해서 signature 확인
		const key = ec.keyFromPublic(address, "hex");
		return key.verify(transaction.id, txIn.signature)
	};

	static validateBlockTransactions = (
		aTransactions: Transaction[],
		aUtxos: Utxo[],
		blockIndex: number
	): boolean => {
    const coinbaseTx = aTransactions[0];
    if(!validCoinbaseTx(coinbaseTx, blockIndex)) {
      console.log("Invalid coinbase transaction: ", JSON.stringify(coinbaseTx));
      return false;
    }
    
    // 중복된 transaction이 있는지 검증
    const txIns: TxIn[] = _(aTransactions).map(tx => tx.txIns).flatten().value();

    if (hasDuplicates(txIns)) {
      return false;
    }

    // coinbase transaction을 제외한 나머지
    const normalTransactions: Transaction[] = aTransactions.slice(1);
    return normalTransactions
			.map((tx) => this.validateTransaction(tx, aUtxos))
			.reduce((a, b) => a && b, true);
  };

	// input을 sign하면 txId가 sign됨
	static signTxIn = (
		transaction: Transaction,
		txInIndex: number,
		privatekey: string,
		aUtxos: Utxo[]
	): string => {
		const txIn: TxIn = transaction.txIns[txInIndex];
		const dataToSign = transaction.id;
		const referencedUtxo: Utxo = findUtxo(
			txIn.txOutId,
			txIn.txOutIndex,
			aUtxos
		);
		if (referencedUtxo == null) {
			console.log("Cannot find referenced txOut");
			throw Error();
		}
		const referencedAddress = referencedUtxo.address;

		const key = ec.keyFromPrivate(privatekey, "hex");
		const signature: string = toHexString(key.sign(dataToSign).toDER());

		return signature;
	};
}

