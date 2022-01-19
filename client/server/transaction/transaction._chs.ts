import * as CryptoJS from "crypto-js";
import * as ecdsa from "elliptic";
import * as _ from "lodash";
import { findUnspentTxOuts } from "../wallet/wallet";

const ec = new ecdsa.ec("secp256k1");

const COINBASE_AMOUNT: number = 50;

class UnspentTxOut {
    public readonly txOutId: string;
    public readonly txOutIndex: number;
    public readonly address: string;
    public readonly amount: number;

    constructor(
        txOutId: string,
        txOutIndex: number,
        address: string,
        amount: number
    ) {
        this.txOutId = txOutId;
        this.txOutIndex = txOutIndex;
        this.address = address;
        this.amount = amount;
    }
}

interface TxIn {
    txOutId: string;
    txOutIndex: number;
    signature: string;
}

class TxOut {
    public address: string;
    public amount: number;

    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}

interface Transaction {
    id: string;

    txIns: TxIn[];
    txOuts: TxOut[];
}

const getTransactionId = (transaction: Transaction): string => {
    // 트랜잭션 In 컨텐츠들 스트링으로 변환 (reduce함수로 공백 제거
    const txInContent: string = transaction.txIns
        .map((txIn: TxIn) => {
            return txIn.txOutId + txIn.txOutIndex;
        })
        .reduce((a, b) => a + b, "");
    // 트랜잭션 Out 컨텐츠들 스트링으로 변환 (reduce함수로 공백 제거
    const txOutContent: string = transaction.txOuts
        .map((txOut: TxOut) => {
            return txOut.address + txOut.amount;
        })
        .reduce((a, b) => a + b, "");
    return CryptoJS.SHA256(txInContent + txOutContent).toString();
};

const signTxIn = (
    transaction: Transaction,
    txInIndex: number,
    privateKey: string,
    aUnspentTxOuts: UnspentTxOut[]
): string => {
    const txIn: TxIn = transaction.txIns[txInIndex];
    const dataToSign = transaction.id;
    const referencedUnspentTxOut: UnspentTxOut = findUnspentTxOuts;

    const signature = "";
    return signature;
};
