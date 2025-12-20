// Import necessary libraries from ethers.js
const { ethers } = require("hardhat");

async function main() {
  // Get all available signers
  const accounts = await ethers.getSigners();

  // Choose the sender account, for example, account at index 1 (change this as needed)
  const sender = accounts[1]; // Change index to select a different account

  // Contract ABI and address
  const contractAddress = '0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7'; // Replace with actual contract address
  const abi = ['function approve(address spender, uint256 amount) public returns (bool)'];

  // Create contract instance using sender as the signer
  const afCoin = new ethers.Contract(contractAddress, abi, sender);

  // Specify the spender address and the amount to approve
  const spender = '0x381d7efc5ce56e1273694a80e677b8121654fe58'; // Address to approve
  const amount = ethers.utils.parseEther('60'); // Amount to approve (100 AFC)

  // Call the approve function to allow the spender to spend the tokens
  console.log(`Approving ${ethers.utils.formatEther(amount)} AFC for spender: ${spender}`);
  const tx = await afCoin.approve(spender, amount);

  // Wait for the transaction to be mined
  await tx.wait();
  
  // Confirm the transaction was successful
  console.log(`Transaction successful! Approved ${ethers.utils.formatEther(amount)} AFC for spender: ${spender}`);
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
