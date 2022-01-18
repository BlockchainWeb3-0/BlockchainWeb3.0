/**
 * Transaction Pool
 * - Unconfirmed transaction들을 담아두는 곳
 * - bitcoin에서는 Mempool 이라고도 부른다.
 */

import _ from "lodash";
import {
	Transaction,
	TxIn,
	UnspentTxOut,
	TxFunctions,
} from "../transaction/transaction";

let transactionPool: Transaction[] = [];

class TransactionPool {
	static getTransactionPool = () => {
		return _.cloneDeep(transactionPool);
	};

	static addToTransactionPool = ( tx: Transaction, unspentTxOuts: UnspentTxOut[]) => {
    if(!TxFunctions.validateTransaction) {
      throw Error("You are trying to add invalid tx to transaction pool")
    }

    if(!this.isValidTxForPool(tx, transactionPool)) {
      throw Error("You are trying to add invalid tx to transaction pool")
    }

    console.log("Successfully added to pool, tx: ", JSON.stringify(tx));
    transactionPool.push(tx);
  }

  static hasTxIn = (txIn: TxIn, unspentTxOuts: UnspentTxOut[]): boolean => {
    const foundTxIn = unspentTxOuts.find((utxo: UnspentTxOut) => {
      return utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex;
    })
    return foundTxIn !== undefined
  }

  static updateTransactionPool = (unspentTxOuts: UnspentTxOut[]) => {
    const invalidTxs = [];
    for (const tx of transactionPool) {
      for (const txIn of tx.txIns) {
        if(!this.hasTxIn(txIn, unspentTxOuts)){
          invalidTxs.push(tx);
          break;
        }
      }
    }
  }
}
