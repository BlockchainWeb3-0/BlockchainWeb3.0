import fs from 'fs'
import merkle from "merkle";
import cryptojs from "crypto-js"

class Block {
  public header: BlockHeader;
  public data: object[];
  public hash: string;

  constructor(header: BlockHeader, data: object[], hash: string) {
    this.header = header;
    this.data = data;
    this.hash = hash;
  }
  
  static getVersion (): string {
    const packagejson: string = fs.readFileSync("package.json", "utf8");
    const version: string = JSON.parse(packagejson).version;
    return version;
  }
  
  static calHashofBlock (blockHeader: BlockHeader) {
    if(typeof blockHeader === "object") {
      const blockString: string =
        blockHeader.version +
        blockHeader.index +
        blockHeader.prevHash +
        blockHeader.merkleRoot +
        blockHeader.timestamp +
        blockHeader.difficulty +
        blockHeader.nonce;
      const hash = cryptojs.SHA256(blockString).toString();
      return hash
    }
    console.log("Invalid BlockHeader");
    return "null"
  }

  static getGenesisBlock (): Block {
    const data = [{tx: "This is Genesis Block"}]
    const header = new BlockHeader(
			"0.1.0",
			0,
			"0".repeat(64),
			merkle("sha256").sync(data).root() || "0".repeat(64),
			1631006505,
			1,
			0
		);
    const hash = this.calHashofBlock(header);
    const genesisBlock = new Block(header, data, hash)
    return genesisBlock
  }
  
  static blockchain: Block[] = [];
  
  static getLastBlock (): Block {
    return this.blockchain[this.blockchain.length-1];
  }

  static mineNewBlock (prevBlock: Block, data: object[]):Block {
    let hash: string;
    const version = prevBlock.header.version;
    const index = prevBlock.header.index + 1;
    const prevHash: string = prevBlock.hash;
    let merkleRoot = merkle("sha256").sync(data).root();
    let timestamp: number;
    let difficulty = prevBlock.header.difficulty;
    let nonce: number = 0;
    let blockHeader: BlockHeader;
    do {
      timestamp = Date.now();
      blockHeader = new BlockHeader(version, index, prevHash, merkleRoot, timestamp, difficulty, nonce)
      hash = this.calHashofBlock(blockHeader)
      nonce++;
    } while(hash.startsWith("0".repeat(difficulty)))
    return new Block(blockHeader, data, hash);
  }
}

class BlockHeader {
  public version: string;
  public index: number;
  public prevHash: string;
  public merkleRoot: string;
  public timestamp: number;
  public difficulty: number;
  public nonce: number;

  constructor(version: string, index: number, prevHash: string, merkleRoot: string, timestamp: number, difficulty: number, nonce: number){
    this.version = version;
    this.index = index;
    this.prevHash = prevHash;
    this.merkleRoot = merkleRoot;
    this.timestamp = timestamp;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}


Block.blockchain.push(Block.getGenesisBlock())

export {Block, BlockHeader}