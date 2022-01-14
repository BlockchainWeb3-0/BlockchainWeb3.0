import merkle = require("merkle");
import Block from "./block";
import * as config from "../config";

export default class Blockchain {
    chain: Block[];

    constructor() {
        this.chain = [Block.getGenesisBlock()];
    }

    getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data: object[]) {
        const newBlock: Block = Block.mineNewBlock(
            this.chain[this.chain.length - 1],
            data
        );
        const lastBlock: Block = this.getLastBlock();
        if (Blockchain.isValidNewBlock(newBlock, lastBlock))
            this.chain.push(newBlock);
        return newBlock;
    }

    static isValidBlockStructure(block: Block) {
        return (
            typeof block.header.version === "string" &&
            typeof block.header.index === "number" &&
            typeof block.header.prevHash === "string" &&
            typeof block.header.merkleRoot === "string" &&
            typeof block.header.timestamp === "number" &&
            typeof block.header.difficulty === "number" &&
            typeof block.header.nonce === "number" &&
            typeof block.data === "object" &&
            typeof block.hash === "string"
        );
    }

    static isValidNewBlock(newBlock: Block, lastBlock: Block): boolean {
        /**
         * Validate
         *  1. block structure
         *  2. index
         *  3. prevHash
         *  4. merkleRoot
         *  5. timestamp
         *  6. difficulty
         */
        if (!this.isValidBlockStructure(newBlock)) {
            console.log("Invalid Block structure");
            return false;
        } else if (newBlock.header.index !== lastBlock.header.index + 1) {
            console.log("Invalid index");
            return false;
        } else if (newBlock.header.prevHash !== lastBlock.hash) {
            console.log("Invalid prevHash");
            return false;
        } else if (
            (newBlock.data.length === 0 &&
                newBlock.header.merkleRoot !== "0".repeat(64)) ||
            (newBlock.data.length !== 0 &&
                newBlock.header.merkleRoot !==
                    merkle("sha256")
                        .sync([JSON.stringify(newBlock.data)])
                        .root())
        ) {
            console.log("Invalid merkleRoot");
            return false;
        } else if (newBlock.header.timestamp < lastBlock.header.timestamp) {
            console.log("Invalid timestamp");
            return false;
        } else if (
            !newBlock.hash.startsWith("0".repeat(newBlock.header.difficulty))
        ) {
            console.log("Invalid difficulty");
            return false;
        }
        return true;
    }

    static isValidChain(blocks: Block[]): boolean {
        if (
            JSON.stringify(blocks[0]) !==
            JSON.stringify(Block.getGenesisBlock())
        ) {
            return false;
        }
        for (let i = 1; i < blocks.length; i++) {
            const currentBlock: Block = blocks[i];
            const prevBlock: Block = blocks[i - 1];
            if (!this.isValidNewBlock(currentBlock, prevBlock)) {
                return false;
            }
        }
        return true;
    }

    replaceChain(newBlocks: Block[]): boolean {
        if (newBlocks.length <= this.chain.length) {
            console.log(
                "No need to replace : New chain is shorter than current one"
            );
            return false;
        }
        if (!Blockchain.isValidChain(newBlocks)) {
            console.log("No need to replace : New chain is invalid");
            return false;
        }
        this.chain = newBlocks;
        console.log("Replace current chain with new one");
        return true;
    }
}
