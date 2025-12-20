const { ethers } = require("ethers");

// Replace with your token's contract address and ABI
const tokenAddress = "0x0471B72Fe3a1e1350800DAA5AEbbBa319C679b03";
const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// Your wallet address
const myAddress = "0x77ce269432761f979ac11D42d958551af42a3653";

// Connect to Ethereum network (replace with your RPC URL)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

// Create a contract instance
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

async function getMyBalance() {
  const balance = await tokenContract.balanceOf(myAddress);
  const decimals = await tokenContract.decimals(); // Fetch decimals to format balance
  console.log(`Your Balance: ${ethers.utils.formatUnits(balance, decimals)} Tokens`);
}

getMyBalance().catch((error) => console.error(error));
