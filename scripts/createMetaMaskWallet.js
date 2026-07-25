// Script to create a new wallet and fund it from Ganache for MetaMask import
const { ethers } = require("ethers");

async function main() {
  // Connect to Ganache
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Get the first Ganache account (pre-funded)
  const accounts = await provider.listAccounts();
  console.log("Ganache first account:", accounts[0]);

  // Check its balance
  const balance = await provider.getBalance(accounts[0]);
  console.log("Ganache account balance:", ethers.utils.formatEther(balance), "ETH");

  // Create a NEW random wallet
  const newWallet = ethers.Wallet.createRandom();
  console.log("\n=== NEW WALLET FOR METAMASK ===");
  console.log("Address:    " + newWallet.address);
  console.log("Private Key: " + newWallet.privateKey);
  console.log("");
  
  // Connect the new wallet to the provider
  const signer = newWallet.connect(provider);

  // Send 2 ETH from the first Ganache account to the new wallet
  const tx = await provider.getSigner(accounts[0]).sendTransaction({
    to: newWallet.address,
    value: ethers.utils.parseEther("2.0"),
    gasLimit: 21000
  });
  
  console.log("Sending 2 ETH to new wallet...");
  await tx.wait();
  console.log("Transaction confirmed:", tx.hash);
  
  // Verify the new wallet balance
  const newBalance = await provider.getBalance(newWallet.address);
  console.log("New wallet balance:", ethers.utils.formatEther(newBalance), "ETH");
  
  console.log("\n========================================");
  console.log("✅ Now import this Private Key into MetaMask!");
  console.log("========================================\n");
}

main().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
