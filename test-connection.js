const { ethers } = require("ethers"); // Directly use ethers.js

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Ganache URL
  const accounts = await provider.listAccounts();
  console.log("Connected accounts:", accounts);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
