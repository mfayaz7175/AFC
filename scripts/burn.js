const { ethers } = require("ethers");
const path = require("path");

// Resolve ABI file path
const abiPath = path.resolve(__dirname, "../afc-transfer/src/afcContractABI.js");

let abi;
try {
    abi = require(abiPath); // Ensure that the ABI is properly exported
} catch (error) {
    console.error("Error loading ABI file. Ensure the path is correct:", abiPath);
    console.error(error.message);
    process.exit(1);
}

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545"); // Ganache or your provider
const contractAddress = "0x58193B612592BD57e009322483dce3D85F72a1cA"; // Replace with the actual contract address
const privateKey = "b38584743aada61fb5177dd14e581bd098bb2a02276416a0b482efb190e673a6"; // Replace with the actual private key

const wallet = new ethers.Wallet(privateKey, provider);
const afcToken = new ethers.Contract(contractAddress, abi, wallet);

async function burnTokens() {
    try {
        // Set the amount to burn (5 tokens in this case)
        const amountToBurn = ethers.utils.parseUnits("5", 18); // Adjust decimal places if needed

        // Check token balance of the wallet
        const balance = await afcToken.balanceOf(wallet.address);
        console.log(`Current balance: ${ethers.utils.formatUnits(balance, 18)} tokens`);

        // Ensure sufficient balance for burn
        if (balance.lt(amountToBurn)) {
            console.error("Insufficient balance to burn the specified amount.");
            return;
        }

        console.log(`Attempting to burn ${ethers.utils.formatUnits(amountToBurn, 18)} tokens...`);

        // Call the burn function with manual gas limit
        const tx = await afcToken.burn(amountToBurn, { gasLimit: 100000 });
        console.log("Transaction sent, awaiting confirmation...");

        // Wait for transaction confirmation
        const receipt = await tx.wait();
        console.log("Tokens burned successfully!");
        console.log("Transaction receipt:", receipt);

    } catch (error) {
        console.error("Error burning tokens:", error.message);
        if (error.error) {
            console.error("Detailed error:", error.error);
        }
    }
}

// Execute the burnTokens function
burnTokens();
