const { ethers } = require("hardhat");

async function main() {
    // Connect to Ganache
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    // Sender and Receiver Details
    const sender = "0x99caF73B99e932D1223098aA8feaC6A1f84dC6B2"; // Replace with sender address
    const receiver = "0xC95334fB8256f8c6Eb0d7e0aA497C796ce50498d"; // Replace with receiver address
    const privateKey = "0x724052aca919c0a0c190728b9400a592a2eb6b6cdfca0a85f6f11d41fd90063a"; // Replace with sender private key

    // Create Wallet for Sender
    const wallet = new ethers.Wallet(privateKey, provider);

    // Transaction Details
    const tx = {
        to: receiver,
        value: ethers.utils.parseEther("50.0"), // Amount in Ether
        gasLimit: 21000, // Gas limit for simple transfer
    };

    // Send the Transaction
    const transaction = await wallet.sendTransaction(tx);
    console.log("Transaction sent:", transaction.hash);

    // Wait for Confirmation
    const receipt = await transaction.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
