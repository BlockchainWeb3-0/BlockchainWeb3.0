class Block {
  public header: BlockHeader;
  public data: object[];
  public hash: string;

  constructor(header: BlockHeader, data: object[], hash: string) {
    this.header = header;
    this.data = data;
    this.hash = hash;
  }
  
}

class BlockHeader {
  public version: string;
  public index: number;
  public merkleRoot: string;
  public timestamp: number;
  public difficulty: number;
  public nonce: number;

  constructor(version: string, index: number, merkleRoot: string, timestamp: number, difficulty: number, nonce: number){
    this.version = version;
    this.index = index;
    this.merkleRoot = merkleRoot;
    this.timestamp = timestamp;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}