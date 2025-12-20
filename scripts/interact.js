const { ethers } = require("ethers");

// Replace with your token's contract address and ABI
const tokenAddress = "0x0471B72Fe3a1e1350800DAA5AEbbBa319C679b03";
const tokenABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

// Connect to Ethereum network
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

// Create a contract instance
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

async function getTokenDetails() {
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();
  const totalSupply = await tokenContract.totalSupply();

  console.log(`Token Name: ${name}`);
  console.log(`Token Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Total Supply: ${ethers.utils.formatUnits(totalSupply, decimals)}`);
}

getTokenDetails().catch((error) => console.error(error));
