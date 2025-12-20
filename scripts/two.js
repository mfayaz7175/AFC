const { ethers } = require("hardhat");

async function main() {
  // Signer address (the account that will approve the transfer)
  const signer = await ethers.getSigner();
  console.log("Signer Address:", signer.address);

  // Define the recipient address and the amount to transfer
  const recipientAddress = "0xB6aBfE0081Cb2A9DeE63ab2c7AaD2CC38dbCB121"; // Replace with actual recipient address
  const transferAmount = ethers.utils.parseUnits("100", 18); // 100 tokens, assuming 18 decimal places

  // Get the deployed token contract instance
  const tokenAddress = "0x21ACa73B51D4f079be3a6729d069a17ee61FCE60"; // Replace with your token contract address
  const tokenContract = await ethers.getContractAt("ERC20", tokenAddress);

  // Log the sender's and recipient's balances before the transfer
  const senderBalanceBefore = await tokenContract.balanceOf(signer.address);
  const recipientBalanceBefore = await tokenContract.balanceOf(recipientAddress);

  console.log(`Sender's Balance before transfer: ${ethers.utils.formatUnits(senderBalanceBefore, 18)} AFC`);
  console.log(`Recipient's Balance before transfer: ${ethers.utils.formatUnits(recipientBalanceBefore, 18)} AFC`);

  // Approve the transfer (allow the recipient to spend tokens on behalf of the sender)
  console.log("Approving transfer of 100.0 tokens...");
  const approvalTx = await tokenContract.approve(recipientAddress, transferAmount);
  await approvalTx.wait();
  console.log("Approval successful!");

  // Log the allowance for the recipient
  const allowance = await tokenContract.allowance(signer.address, recipientAddress);
  console.log(`Allowance for transfer: ${ethers.utils.formatUnits(allowance, 18)} AFC`);

  // Attempt the transfer using `transferFrom`
  try {
    console.log("Transferring 100.0 tokens...");
    const transferTx = await tokenContract.transferFrom(signer.address, recipientAddress, transferAmount, {
      gasLimit: 200000 // Set a gas limit (increased for safety)
    });
    await transferTx.wait();

    console.log("Transfer successful!");
  } catch (error) {
    console.error("Error during token transfer:", error);
    console.log("Error details:", error.data ? error.data : "No additional error data");
  }

  // Log the sender's and recipient's balances after the transfer
  const senderBalanceAfter = await tokenContract.balanceOf(signer.address);
  const recipientBalanceAfter = await tokenContract.balanceOf(recipientAddress);

  console.log(`Sender's Balance after transfer: ${ethers.utils.formatUnits(senderBalanceAfter, 18)} AFC`);
  console.log(`Recipient's Balance after transfer: ${ethers.utils.formatUnits(recipientBalanceAfter, 18)} AFC`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
