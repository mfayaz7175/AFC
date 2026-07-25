// const { ethers } = require("hardhat");

// async function main() {
//   // Get all signers
//   const signers = await ethers.getSigners();

//   // Log the address of each signer
//   console.log("List of Signers:");
//   signers.forEach((signer, index) => {
//     console.log(`Signer ${index + 1}: ${signer.address}`);
//   });
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


// const { ethers } = require("hardhat");

// async function main() {
//   // Replace with your deployed contract address on Ganache or the actual address on the network
//   const contractAddress = "0x4A93d884EA533ac62449F48F90EC436824AC0A0F";

//   // Replace with the new owner's address
//   const newOwnerAddress = "0x4A93d884EA533ac62449F48F90EC436824AC0A0F";

//   // Get the list of signers (accounts)
//   const [signer] = await ethers.getSigners();
//   console.log("Signer Address:", signer.address);

//   // ABI for the contract
//   const contractABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];

//   // Connect to the deployed contract
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);

//   // Ensure that the current signer is the contract owner
//   const currentOwner = await contract.owner();
//   console.log("Current Owner Address:", currentOwner);

//   if (signer.address.toLowerCase() !== currentOwner.toLowerCase()) {
//     console.log("Error: You are not the owner of the contract.");
//     return;
//   }

//   console.log(`Transferring ownership to: ${newOwnerAddress}`);

//   // Transfer ownership
//   const tx = await contract.transferOwnership(newOwnerAddress);
//   console.log("Transaction sent, waiting for confirmation...");

//   // Wait for the transaction to be mined
//   const receipt = await tx.wait();
//   console.log("Transaction confirmed:", receipt.transactionHash);

//   console.log(`Ownership successfully transferred to ${newOwnerAddress}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x199E815B6b0C53214F64E230131B148A65660324"; // Replace with your deployed contract address

  // The private key of the address 0x38070b37b08901849b777fC9771Cee5997098930
  const privateKey = "fa635a9b64163611ea18d79228752c826b2e3d0bafd2f14826dcd1b7ee70f72b"; // Replace with the private key of 0x38070b37b08901849b777fC9771Cee5997098930

  // Set up the provider (Ganache default provider)
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Ganache RPC URL

  // Set up the signer
  const signer = new ethers.Wallet(privateKey, provider);

  console.log("Signer Address:", signer.address);

  // ABI for the contract
  const contractABI = [
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Connect to the contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Fetch and log the current owner
  const owner = await contract.owner();
  console.log("Current Owner Address:", owner);

  // Additional operations can be added here if needed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





// const { ethers } = require("ethers");

// const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Replace with your provider

// async function getContractAddresses() {
//   const latestBlock = await provider.getBlockNumber();
//   const contractAddresses = [];

//   for (let i = 0; i <= latestBlock; i++) {
//     const block = await provider.getBlockWithTransactions(i);
//     for (const tx of block.transactions) {
//       if (tx.to === null) {
//         // Contract creation transaction
//         const receipt = await provider.getTransactionReceipt(tx.hash);
//         contractAddresses.push(receipt.contractAddress);
//       }
//     }
//   }

//   console.log("Deployed contract addresses:", contractAddresses);
// }

// getContractAddresses();
