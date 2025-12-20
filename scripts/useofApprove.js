const { ethers } = require("hardhat");

async function main() {
  // Get all available signers
  const accounts = await ethers.getSigners();
  console.log(accounts[4])

  // Choose the sender (owner) account
  const sender = accounts[3]; // Owner who approves the spender
  const spender = accounts[4]; // Spender who will transfer the tokens
  const recipient = accounts[5]; // Recipient who will receive the tokens

  // Contract ABI and address
  const contractAddress = '0x81c96871121a7a671e626F269e1b1fD6E1e93743'; // Replace with your contract address
  const abi = ['function approve(address spender, uint256 amount) public returns (bool)',
               'function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)'];

  // Create contract instance
  const afCoin = new ethers.Contract(contractAddress, abi, sender);

  // Amount of AFC tokens to approve
  const amount = ethers.utils.parseEther('50'); // Approve 50 AFC

  // Approve the spender to transfer tokens
  console.log(`Approving ${ethers.utils.formatEther(amount)} AFC for spender: ${spender.address}`);
  const approvalTx = await afCoin.approve(spender.address, amount);
  await approvalTx.wait();
  console.log('Approval successful.');

  // Create contract instance for spender
  const afCoinSpender = afCoin.connect(spender); // Connect spender as the signer

  // Transfer tokens from sender to recipient using transferFrom
  console.log(`Spender ${spender.address} is transferring ${ethers.utils.formatEther(amount)} AFC to ${recipient.address}`);
  const transferTx = await afCoinSpender.transferFrom(sender.address, recipient.address, amount);

  // Wait for transaction to be mined
  await transferTx.wait();
  console.log('Transfer successful!');
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
