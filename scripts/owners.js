// const { ethers } = require("hardhat");

// async function main() {
//   const contractAddress = "0x2cE0bC6DDdd3A6EeAF709e9CCaB347eFADDCa75e"; // Replace with your contract address
//   const afcToken = await ethers.getContractAt("AfCoin", contractAddress);
//   const owner = await afcToken.owner();
//   console.log("Contract owner:", owner);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


import React, { useState } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '../afcContractABI'; // Ensure the ABI is correct

function BurnPage() {
  const [burnAmount, setBurnAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const contractAddress = '0x2cE0bC6DDdd3A6EeAF709e9CCaB347eFADDCa75e'; // Replace with the correct contract address
  const ownerAddress = '0x2cE0bC6DDdd3A6EeAF709e9CCaB347eFADDCa75e'; // The address you want as the signer (contract owner)

  const handleBurn = async () => {
    if (!burnAmount || isNaN(burnAmount) || Number(burnAmount) <= 0) {
      setMessage('Please enter a valid positive burn amount.');
      return;
    }

    try {
      if (!window.ethereum) {
        setMessage('MetaMask is not installed.');
        return;
      }

      setLoading(true);
      setMessage('');

      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); // Request account access
      const signer = provider.getSigner();

      // Ensure the signer is the contract's owner
      const signerAddress = await signer.getAddress();
      if (signerAddress !== ownerAddress) {
        setMessage('You are not the owner of the contract.');
        return;
      }

      // Initialize contract with the signer
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);

      // Convert burn amount to Wei
      const amountInWei = ethers.utils.parseUnits(burnAmount, 18);

      // Estimate gas and burn tokens
      const gasLimit = await afcToken.estimateGas.burn(amountInWei);
      const tx = await afcToken.burn(amountInWei, { gasLimit });
      await tx.wait();

      setMessage(`Successfully burned ${burnAmount} tokens.`);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.data?.message || error.reason || 'Transaction failed. Please try again.';
      setMessage(`Error burning tokens: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Burn Tokens</h2>

      <div>
        <input
          type="text"
          placeholder="Amount to Burn"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
        />
        <button onClick={handleBurn} disabled={loading}>
          {loading ? 'Processing...' : 'Burn Tokens'}
        </button>
      </div>

      {message && <div>{message}</div>}
    </div>
  );
}

export default BurnPage;
