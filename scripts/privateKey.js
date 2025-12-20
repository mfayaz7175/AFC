const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();

  console.log("Accounts and Private Keys:");
  accounts.forEach((account, index) => {
    console.log(`Account ${index + 1}: ${account.address}`);
    console.log(`Private Key: ${account.privateKey}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
