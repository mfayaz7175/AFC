const hre = require("hardhat");

async function main() {
    
    // const afCoinAddress = "0xa73A3d63Fe9dC82Dc891e74c3Ff1830e89547514"; // Replace with deployed contract address
    const afCoinAddress = "0x3734bf64c58F4c0a2719692dfB4929dDb1926116"; // Replace with deployed contract address
    const recipient = "0x21ACa73B51D4f079be3a6729d069a17ee61FCE60"; // Replace with the recipient's address
    const amount = hre.ethers.utils.parseEther("500"); // Amount to mint

    const AfCoin = await hre.ethers.getContractAt("AfCoin", afCoinAddress);

    try {
        console.log("Minting tokens...");
        const tx = await AfCoin.mint(recipient, amount);
        const txReceipt = await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction receipt:", txReceipt);

        console.log(`Minted ${hre.ethers.utils.formatEther(amount)} tokens to ${recipient}`);

        // Fetch the recipient's balance
        const balance = await AfCoin.balanceOf(recipient);
        console.log("Recipient's balance:", hre.ethers.utils.formatEther(balance));
    } catch (error) {
        console.error("Error during minting:", error);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error("Main execution error:", error);
    process.exitCode = 1;
});
