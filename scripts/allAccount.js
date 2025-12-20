const { ethers } = require("hardhat");

async function main() {
  // Replace with your deployed token contract address
  const tokenAddress = "0x4A93d884EA533ac62449F48F90EC436824AC0A0F";

  // Replace with the ABI of your token
  const tokenABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  // Get all accounts from the network
  const accounts = await ethers.getSigners();

  // Connect to the token contract
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, ethers.provider);

  for (const account of accounts) {
    const balance = await tokenContract.balanceOf(account.address);
    const decimals = await tokenContract.decimals();
    console.log(`Account: ${account.address}, Balance: ${ethers.utils.formatUnits(balance, decimals)}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
