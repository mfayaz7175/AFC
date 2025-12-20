const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();
  
  // Use the first signer, or change the index if you want another signer
  const sender = signers[0]; // You can use signers[1], signers[2], etc.
  console.log("Using address:", sender.address);

  // Your contract interactions go here
  const afCoinAddress = "0x6FF2FEA4419F720f6E2A69992d1D2AdC10683e2b"; // Replace with your contract's address
  const recipient = "0x3cEe255560c4809174eacFe9AB0e1aD753233bDD"; // Example recipient address
  const amount = hre.ethers.utils.parseUnits("100", 18); // Adjust decimals for your token

  // Initialize the contract with the chosen sender
  const AfCoin = await hre.ethers.getContractAt("AfCoin", afCoinAddress, sender);

  // Perform the transfer using the chosen sender account
  console.log("Sending tokens from:", sender.address);
  const tx = await AfCoin.transfer(recipient, amount, {
    gasLimit: 100000,  // Adjust gas limit as needed
  });

  await tx.wait();
  console.log(`Transfer complete: ${amount.toString()} AFC to ${recipient}`);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
