import Block from "../block";
import Blockchain from "../blockchain";

describe("Blockchain test", () => {
	let blockchain1: Blockchain;
	let blockchain2: Blockchain;
	let testData: object[];
	beforeEach(() => {
		testData = [{ tx: "test" }];
		blockchain1 = new Blockchain();
		blockchain2 = new Blockchain();
	});

	test("First Block of blockchain is Genesis Block", () => {
		expect(blockchain1.chain[0]).toEqual(Block.getGenesisBlock());
	});

	test("Add block into blockchain", () => {
		let newBlock: Block = blockchain1.addBlock(testData);

		// test data
		expect(newBlock.data).toEqual(testData);
		expect(blockchain1.getLastBlock().data).toEqual(testData);
		expect(blockchain1.chain[blockchain1.chain.length - 1].data).toEqual(testData);

		// test Block
		expect(blockchain1.getLastBlock()).toEqual(newBlock);
		expect(blockchain1.chain[blockchain1.chain.length - 1]).toEqual(newBlock);
	});

  // test isValidChain function
	test("validate chain => valid chain", () => {
		blockchain2.addBlock(testData);
		expect(Blockchain.isValidChain(blockchain2.chain)).toBe(true);
	});
	test("validate chain => corrupt genesis data", () => {
		blockchain2.chain[0].data = [{ tx: "corrupted genesis" }];
		expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
	});
	test("validate chain => corrupt genesis hash", () => {
		blockchain2.chain[0].hash = "corrupted genesis";
		expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
	});
  test("validate chain => corrupt new Block data", () => {
    blockchain2.addBlock(testData);
    blockchain2.getLastBlock().data = [{tx: "corrupted newBlock"}];
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });
});
