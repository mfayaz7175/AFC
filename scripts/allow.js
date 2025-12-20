// Import necessary modules
const { ethers } = require("hardhat");

async function main() {
    const accounts = await ethers.getSigners();
    const tokenAddress = "0x0471B72Fe3a1e1350800DAA5AEbbBa319C679b03"; // Your token address
    const tokenContract = new ethers.Contract(tokenAddress, ["function balanceOf(address) view returns (uint256)"], accounts[0]);
  
    for (let account of accounts) {
      const balance = await tokenContract.balanceOf(account.address);
      console.log(`${account.address}: ${ethers.utils.formatUnits(balance, 18)} AFC`);
    }
  }

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
