import fs = require("fs");
import merkle = require("merkle");
import cryptojs = require("crypto-js");

import * as config from "../config";

class BlockHeader {
    public version: string;
    public index: number;
    public prevHash: string;
    public merkleRoot: string;
    public timestamp: number;
    public difficulty: number;
    public nonce: number;

    constructor(
        version: string,
        index: number,
        prevHash: string,
        merkleRoot: string,
        timestamp: number,
        difficulty: number,
        nonce: number
    ) {
        this.version = version;
        this.index = index;
        this.prevHash = prevHash;
        this.merkleRoot = merkleRoot;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
}

export default class Block {
    public header: BlockHeader;
    public hash: string;
    public data: object[];

    constructor(header: BlockHeader, hash: string, data: object[]) {
        this.header = header;
        this.hash = hash;
        this.data = data;
    }

    static getVersion(): string {
        const packagejson: string = fs.readFileSync("package.json", "utf8");
        const version: string = JSON.parse(packagejson).version;
        return version;
    }

    static getGenesisBlock(): Block {
        const data = [{ tx: "This is Genesis Block" }];
        const header = new BlockHeader(
            "0.1.0",
            0,
            "0".repeat(64),
            merkle("sha256").sync(data).root() || "0".repeat(64),
            1631006505,
            config.INITIAL_DIFFICULTY,
            0
        );
        const hash = this.calHashOfBlock(header);
        const genesisBlock = new Block(header, hash, data);
        return genesisBlock;
    }

    static mineNewBlock(lastBlock: Block, data: object[]): Block {
        const version = lastBlock.header.version;
        const index = lastBlock.header.index + 1;
        const prevHash: string = lastBlock.hash;
        let merkleRoot = data.length
            ? merkle("sha256").sync(data).root()
            : "0".repeat(64);
        let timestamp: number = Math.round(Date.now() / 1000);
        let difficulty = this.adjustDifficulty(lastBlock, timestamp);
        let nonce: number = 0;
        let blockHeader: BlockHeader;
        let hash: string;
        do {
            timestamp = Math.round(Date.now() / 1000);
            blockHeader = new BlockHeader(
                version,
                index,
                prevHash,
                merkleRoot,
                timestamp,
                difficulty,
                nonce
            );
            hash = this.calHashOfBlock(blockHeader);
            nonce++;
        } while (!hash.startsWith("0".repeat(difficulty)));
        return new Block(blockHeader, hash, data);
    }

    static calHashOfBlock(blockHeader: BlockHeader) {
        if (typeof blockHeader === "object") {
            const blockString: string =
                blockHeader.version +
                blockHeader.index +
                blockHeader.prevHash +
                blockHeader.merkleRoot +
                blockHeader.timestamp +
                blockHeader.difficulty +
                blockHeader.nonce;
            const hash = cryptojs.SHA256(blockString).toString();
            return hash;
        }
        console.log("Invalid BlockHeader");
        return "null";
    }

    static adjustDifficulty(lastBlock: Block, newBlockTime: number): number {
        let difficulty: number = lastBlock.header.difficulty;
        const newBlockInterval: number =
            newBlockTime - lastBlock.header.timestamp;
        if (
            lastBlock.header.index % config.BLOCK_GENERATION_INTERVAL === 0 &&
            lastBlock.header.index !== 0
        ) {
            if (newBlockInterval > config.MINE_INTERVAL * 2) {
                return difficulty - 1;
            } else if (newBlockInterval < config.MINE_INTERVAL / 2) {
                return difficulty + 1;
            }
        }
        return difficulty;
    }
}

export { Block, BlockHeader };
