const { ethers } = require("hardhat");

async function main() {
  // Replace with your MetaMask account address
  const recipient = "0x66b090D8f62eA291bF337e09aE6229ba0784237d";

  // Get a signer (Hardhat accounts are pre-funded)
  const [sender] = await ethers.getSigners();

  console.log("Sender address:", sender.address);
  console.log("Sending ETH to:", recipient);

  // Send 1 ETH to the recipient
  const tx = await sender.sendTransaction({
    to: recipient,
    value: ethers.utils.parseEther("10"), // Amount to send in ETH
  });

  console.log("Transaction hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
