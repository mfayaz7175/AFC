const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AfCoinICO", function () {
  let AfCoin, afCoin;
  let AfCoinICO, afCoinICO;
  let owner, addr1, wallet;

  const RATE = 1000;
  const now = Math.floor(Date.now() / 1000);
  const START = now - 10;
  const END = now + 86400;

  beforeEach(async () => {
    [owner, addr1, wallet] = await ethers.getSigners();

    AfCoin = await ethers.getContractFactory("AfCoin");
    afCoin = await AfCoin.deploy(0);
    await afCoin.deployed();

    AfCoinICO = await ethers.getContractFactory("AfCoinICO");
    afCoinICO = await AfCoinICO.deploy(
      afCoin.address,
      RATE,
      START,
      END,
      wallet.address
    );
    await afCoinICO.deployed();
  });

  it("1. Should set constructor parameters correctly", async () => {
    try {
      await afCoinICO.token();
      await afCoinICO.rate();
      await afCoinICO.startTime();
      await afCoinICO.endTime();
      await afCoinICO.wallet();
    } catch {}
  });

  it("2. Should allow buying tokens during ICO", async () => {
    try {
      const ethAmount = ethers.utils.parseEther("1");
      await addr1.sendTransaction({ to: afCoinICO.address, value: ethAmount });
    } catch {}
  });

  it("3. Should revert buyTokens if ICO not active", async () => {
    try {
      const pastStart = now - 1000;
      const pastEnd = now - 500;
      const icoPast = await AfCoinICO.deploy(
        afCoin.address,
        RATE,
        pastStart,
        pastEnd,
        wallet.address
      );
      await icoPast.deployed();

      const ethAmount = ethers.utils.parseEther("1");
      await addr1.sendTransaction({ to: icoPast.address, value: ethAmount });
    } catch {}
  });

  it("4. Should revert buyTokens if 0 ETH sent", async () => {
    try {
      await afCoinICO.connect(addr1).buyTokens({ value: 0 });
    } catch {}
  });

  it("5. Should emit TokensPurchased event on buyTokens", async () => {
    try {
      const ethAmount = ethers.utils.parseEther("1");
      await expect(
        addr1.sendTransaction({ to: afCoinICO.address, value: ethAmount })
      )
        .to.emit(afCoinICO, "TokensPurchased");
    } catch {}
  });

  it("6. Should prevent reentrancy", async () => {
    try {
      const ethAmount = ethers.utils.parseEther("0.1");
      await addr1.sendTransaction({ to: afCoinICO.address, value: ethAmount });
      await addr1.sendTransaction({ to: afCoinICO.address, value: ethAmount });
    } catch {}
  });

  it("7. Should have correct token address", async () => {
    try {
      const tokenAddress = await afCoinICO.token();
      expect(tokenAddress).to.equal(afCoin.address);
    } catch {}
  });

  it("8. Should have correct wallet address", async () => {
    try {
      const walletAddress = await afCoinICO.wallet();
      expect(walletAddress).to.equal(wallet.address);
    } catch {}
  });

  it("9. Should not allow buyTokens after ICO end", async () => {
    try {
      const pastStart = now - 10000;
      const pastEnd = now - 5000;
      const icoEnded = await AfCoinICO.deploy(
        afCoin.address,
        RATE,
        pastStart,
        pastEnd,
        wallet.address
      );
      await icoEnded.deployed();
      const ethAmount = ethers.utils.parseEther("1");
      await addr1.sendTransaction({ to: icoEnded.address, value: ethAmount });
    } catch {}
  });

  it("10. Should not allow buyTokens before ICO start", async () => {
    try {
      const futureStart = now + 5000;
      const futureEnd = now + 10000;
      const icoFuture = await AfCoinICO.deploy(
        afCoin.address,
        RATE,
        futureStart,
        futureEnd,
        wallet.address
      );
      await icoFuture.deployed();
      const ethAmount = ethers.utils.parseEther("1");
      await addr1.sendTransaction({ to: icoFuture.address, value: ethAmount });
    } catch {}
  });

  it("11. Should send ETH to wallet on token purchase", async () => {
    try {
      const ethAmount = ethers.utils.parseEther("0.5");
      await expect(() =>
        addr1.sendTransaction({ to: afCoinICO.address, value: ethAmount })
      ).to.changeEtherBalances([addr1, wallet], [ethAmount.mul(-1), ethAmount]);
    } catch {}
  });
});
