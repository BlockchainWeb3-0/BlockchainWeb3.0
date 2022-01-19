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

class TransactionPool {
	static getTransactionPool = (transactionPool: Transaction[]) => {
		return _.cloneDeep(transactionPool);
	};

	/**
	 * addToTransactionPool
	 * - transaction에 대한 검증 후 transaction pool에 추가
	 * @param tx
	 * @param unspentTxOuts
	 */
	static addToTransactionPool = (
		tx: Transaction,
		unspentTxOuts: UnspentTxOut[],
		transactionPool: Transaction[]
	) => {
		if (!TxFunctions.validateTransaction(tx, unspentTxOuts)) {
			throw Error("You are trying to add invalid tx to transaction pool");
		}

		if (!this.isValidTxForPool(tx, transactionPool)) {
			throw Error("You are trying to add invalid tx to transaction pool");
		}

		console.log("Successfully added to pool, tx: ", JSON.stringify(tx));
		transactionPool.push(tx);
	};

	/**
	 * hasTxIn
	 * - txIn이 UTXO에 있는지 확인
	 * @param txIn
	 * @param unspentTxOuts
	 * @returns boolean
	 */
	static hasTxIn = (txIn: TxIn, unspentTxOuts: UnspentTxOut[]): boolean => {
		const foundTxIn = unspentTxOuts.find(
			(utxo: UnspentTxOut) =>
				utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex
		);
		return foundTxIn !== undefined;
	};

	/**
	 * updateTransactionPool
	 * - 새로운 블록에 추가된 trasaction들을 transaction Pool에서 제거
	 * @param unspentTxOuts
	 */
	static updateTransactionPool = (unspentTxOuts: UnspentTxOut[] | null, transactionPool: Transaction[]) => {
		// Transaction Pool에 있는 트랜잭션 중에
		// UTXO에 있다면 이미 새로운 블록에 포함된 것으로 취급
		if( unspentTxOuts == null) {
			throw Error("Invalid unspentTxOuts")
		}
		const invalidTxs = [];
		for (const tx of transactionPool) {
			for (const txIn of tx.txIns) {
				if (!this.hasTxIn(txIn, unspentTxOuts)) {
					invalidTxs.push(tx);
					break;
				}
			}
		}
		// 찾은 트랜잭션들 제거
		if (invalidTxs.length > 0) {
			console.log(
				"Removing the following transactions from transaction pool: ",
				JSON.stringify(invalidTxs)
			);
			transactionPool = _.without(transactionPool, ...invalidTxs);
		}
	};

	/**
	 * getTxPoolIns
	 * - 해당 transaction Pool에 있는 모든 Tx Input을 배열로 반환
	 * @param aTransactionPool
	 * @returns txIns
	 */
	static getTxPoolIns = (aTransactionPool: Transaction[]): TxIn[] => {
		return _(aTransactionPool)
			.map((tx) => tx.txIns)
			.flatten()
			.value();
	};

	/**
	 * isValidTxForPool
	 * - 추가될 tx의 txIns가 transactionPool에 없어야 함
	 * @param tx
	 * @param aTransactionPool
	 * @returns
	 */
	static isValidTxForPool = (
		tx: Transaction,
		aTransactionPool: Transaction[]
	): boolean => {
		const txPoolIns: TxIn[] = this.getTxPoolIns(aTransactionPool);

		const containsTxIn = (txIns: TxIn[], txIn: TxIn) =>
			_.find(
				txPoolIns,
				(txPoolIns) =>
					txIn.txOutIndex === txPoolIns.txOutIndex &&
					txIn.txOutIndex === txPoolIns.txOutIndex
			);

		for (const txIn of tx.txIns) {
			if (containsTxIn(txPoolIns, txIn)) {
				console.log("txIn already found in the transaction pool");
				return false;
			}
		}
		return true;
	};
}

export { TransactionPool };
