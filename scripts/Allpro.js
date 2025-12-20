import { ethers } from "ethers";

async function viewTransactionProperties(event) {
  if (!window.ethereum) {
    console.error("MetaMask (or another Ethereum provider) not found.");
    return;
  }

  // Create a provider from the injected window.ethereum
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  if (!event.transactionHash) {
    console.error("No transaction hash available in the event.");
    return;
  }

  try {
    // Get the transaction receipt using the event's transaction hash
    const txReceipt = await provider.getTransactionReceipt(event.transactionHash);
    if (!txReceipt) {
      console.error("No transaction receipt found for hash:", event.transactionHash);
      return;
    }

    // Now get the full transaction details using the receipt's transaction hash
    const tx = await provider.getTransaction(txReceipt.transactionHash);

    // Log all properties of the transaction
    console.log("Transaction Details:", tx);
    Object.keys(tx).forEach((key) => {
      console.log(`${key}:`, tx[key]);
    });

    // Optionally, you can return the transaction object if needed
    return tx;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
  }
}
