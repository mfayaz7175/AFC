const hre = require("hardhat");

async function main() {
  // Contract address and recipient information
  const afCoinAddress = "0x58193B612592BD57e009322483dce3D85F72a1cA"; // Replace with deployed contract address
  const recipient = "0x8E5d2294758c0E62Dfa4E007758C95cd7f79A887"; // Replace with recipient's address
  const amount = hre.ethers.utils.parseUnits("100", 18); // 100 AFC (adjust decimals to match your token's decimals)

  // Get the sender's account (from your local network)
  const [sender] = await hre.ethers.getSigners();

  // Print balance information before transfer
  console.log("Sender balance before transfer:", hre.ethers.utils.formatUnits(await sender.getBalance(), 18), "ETH");
  const AfCoin = await hre.ethers.getContractAt("AfCoin", afCoinAddress); // Initialize contract after signer

  const senderTokenBalance = await AfCoin.balanceOf(sender.address);
  console.log("Sender token balance before transfer:", hre.ethers.utils.formatUnits(senderTokenBalance, 18), "AFC");

  // Check if the sender has enough AFC tokens
  if (senderTokenBalance.lt(amount)) {
    console.log("Insufficient AFC balance for transfer.");
    return;
  }

  // Perform the transfer of AFC tokens
  console.log("Sending tokens...");
  const tx = await AfCoin.transfer(recipient, amount, {
    gasLimit: 100000,  // Increase gas limit for token transfer if necessary
  });

  // Wait for the transaction to be mined
  await tx.wait();
  console.log(`Transferred ${hre.ethers.utils.formatUnits(amount, 18)} AFC to ${recipient}`);

  // Check recipient's AFC token balance after transfer
  const recipientBalance = await AfCoin.balanceOf(recipient);
  console.log("Recipient's balance after transfer:", hre.ethers.utils.formatUnits(recipientBalance, 18), "AFC");
}

// Execute the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
