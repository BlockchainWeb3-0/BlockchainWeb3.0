import fs from "fs"
import {Block, BlockHeader} from "../block"

// Block class 테스트
describe("Block class", () => {
  let data: object[],
    blockchain: Block[],
    lastBlock: Block,
		block: Block;
  beforeEach(() => {
    data = [{data: "test"}];
    blockchain = Block.blockchain;
    lastBlock = Block.getLastBlock();
    block = Block.mineNewBlock(lastBlock, data);
  })

  test("Block structure validation", ()=>{
    expect(typeof block.hash).toBe("string");
    expect(typeof block.header.version).toBe("string");
    expect(typeof block.header.index).toBe("number");
    expect(typeof block.header.prevHash).toBe("string");
    expect(typeof block.header.merkleRoot).toBe("string");
    expect(typeof block.header.timestamp).toBe("number");
    expect(typeof block.header.difficulty).toBe("number");
    expect(typeof block.header.nonce).toBe("number");
  })
  
  // getVersion 함수 테스트
  test("current version validation", () => {
    const version: string = lastBlock.header.version;
    const expectedVersion: string = JSON.parse(fs.readFileSync("package.json", "utf8")).version
    expect(version).toBe(expectedVersion)
  })
  
  // getGenesisBlock 함수 테스트
  test("genesis Block validation", () => {
    const genesisBlock = Block.getGenesisBlock();
    expect(genesisBlock.header.version).toBe(Block.getVersion())
    expect(genesisBlock.header.index).toBe(0);
    expect(genesisBlock.hash).toBe(Block.calHashofBlock(genesisBlock.header))
  })
  
  // blockchain 테스트
  test("blockchain validation", () => {
    const expectedGenesisBlock = Block.getGenesisBlock();
    const expectedLastBlock = Block.getLastBlock()
    const firstBlock = Block.blockchain[0];
    const lastBlock = Block.blockchain[Block.blockchain.length-1];
    expect(typeof Block.blockchain).toBe("object");
    expect(expectedGenesisBlock).toEqual(firstBlock);
    expect(expectedLastBlock).toEqual(lastBlock);
  })

  // 새로운 블록이 올바른 블록인지 테스트
  test("mineNewBlock validation", () => {
    const newBlock = Block.mineNewBlock(lastBlock, data);
    expect(newBlock.header.prevHash).toBe(lastBlock.hash);
  })
})
