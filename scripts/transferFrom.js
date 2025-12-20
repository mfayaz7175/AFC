const { ethers } = require("ethers");

async function transferFromAccount(tokenAddress, ownerAddress, spenderAddress, recipientAddress, amount, providerUrl, privateKey) {
    // Initialize provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // ERC-20 ABI with `transferFrom` and `allowance` functions
    const abi = [
        "function allowance(address owner, address spender) view returns (uint256)",
        "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)",
        "event Transfer(address indexed from, address indexed to, uint256 value)"
    ];

    // Initialize contract with wallet (signer)
    const tokenContract = new ethers.Contract(tokenAddress, abi, wallet);

    try {
        // Check the current allowance
        const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
        console.log("Current Allowance:", ethers.utils.formatUnits(allowance, 18), "tokens");

        // Convert the transfer amount to the smallest unit (wei)
        const transferAmount = ethers.utils.parseUnits(amount, 18);

        // Ensure the allowance is sufficient
        if (allowance.lt(transferAmount)) {
            console.error("Insufficient allowance for the transfer. Please approve the spender first.");
            return;
        }

        // Perform the `transferFrom` operation
        console.log(`Transferring ${amount} tokens from ${ownerAddress} to ${recipientAddress}...`);
        const tx = await tokenContract.transferFrom(ownerAddress, recipientAddress, transferAmount);
        console.log("Transaction sent:", tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction mined. Receipt:", receipt);
        console.log(`Successfully transferred ${amount} tokens to ${recipientAddress}`);
    } catch (error) {
        console.error("Error during `transferFrom` operation:", error);
    }
}

// Example usage
const tokenAddress = "0x67acdA21c4bEec8EbeD5F51016Ffa7c580cF351C"; // Replace with your ERC-20 token contract address
const ownerAddress = "0xc4d094157e109872f61632F5CeF160EF8d1B8037"; // Replace with the owner's address
const spenderAddress = "0xC95334fB8256f8c6Eb0d7e0aA497C796ce50498d"; // Replace with the spender's address
const recipientAddress = "0x381D7Efc5ce56E1273694A80e677b8121654fE58"; // Replace with the recipient's address
const amount = "1"; // Replace with the amount to transfer (in tokens)
const providerUrl = "http://127.0.0.1:7545"; // Replace with your provider URL (Ganache in this case)
const privateKey = "f630afa853ab3ba96f41aec6f62a8984c3c0542a1b5b1f9d085064c88db71fa4"; // Replace with the private key of the spender

transferFromAccount(tokenAddress, ownerAddress, spenderAddress, recipientAddress, amount, providerUrl, privateKey);
