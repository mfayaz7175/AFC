const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xC5E09CCcB9a1A3283FBC981040786314b393E2Cf"; // Deployed contract address
  const afcContractABI = require('../afc-transfer/src/afcContractABI'); // Ensure ABI path is correct

  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Ganache RPC URL

  // Create the contract instance
  const contract = new ethers.Contract(contractAddress, afcContractABI, provider);

  // Get the current signer (the account executing the script)
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log("Signer address:", signerAddress);

  // Call the contract's owner function
  const owner = await contract.owner();
  console.log("Contract owner:", owner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
