import { Contract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";

interface NewMemoEvent {
  event: string;
  args: {
    from: string;
    name: string;
    message: string;
  };
}

describe("BuyMeACoffee", function () {
  let BuyMeACoffee: ContractFactory;
  let buyMeACoffee: Contract;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    [owner, addr1] = await ethers.getSigners();
    buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await buyMeACoffee.owner()).toBe(await owner.getAddress());
  });

  it("Should allow someone to buy coffee and emit NewMemo event", async function () {
    const name = "Alice";
    const message = "Great work!";
    const tx = await buyMeACoffee
      .connect(addr1)
      .buyCoffee(name, message, { value: ethers.utils.parseEther("1") });

    const receipt = await tx.wait();

    const event = receipt.events?.find(
      (event: NewMemoEvent) => event.event === "NewMemo"
    );
    expect(event).toBeDefined();
    expect(event?.args.from).toBe(await addr1.getAddress());
    expect(event?.args.name).toBe(name);
    expect(event?.args.message).toBe(message);
  });

  it("Should revert if no ETH is sent", async function () {
    await expect(
      buyMeACoffee.connect(addr1).buyCoffee("Alice", "Great work!")
    ).rejects.toThrow("Can't buy coffee with 0 ETH");
  });
});
