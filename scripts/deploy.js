const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1) Deploy the AfCoin token
  const initialSupply = hre.ethers.utils.parseEther("1000"); // 1,000 tokens
  const AfCoin = await hre.ethers.getContractFactory("AfCoin");
  const afCoin = await AfCoin.deploy(initialSupply);
  await afCoin.deployed();
  console.log("AfCoin deployed to:", afCoin.address);

  // 2) Configure a 5-month window
  const now        = Math.floor(Date.now() / 1000);
  const startTime  = now + 60;
  const fiveMonths = 5 * 30 * 24 * 60 * 60;
  const endTime    = startTime + fiveMonths;

  const rate   = 1000;
  const wallet = deployer.address;

  // 3) Deploy the ICO
  const AfCoinICO = await hre.ethers.getContractFactory("AfCoinICO");
  const ico = await AfCoinICO.deploy(
    afCoin.address,
    rate,
    startTime,
    endTime,
    wallet
  );
  await ico.deployed();
  console.log("AfCoinICO deployed to:", ico.address);
  console.log("Sale window:", startTime, "→", endTime);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
