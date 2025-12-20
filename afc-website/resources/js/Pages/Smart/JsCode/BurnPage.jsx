import React, { useState } from "react";
import { ethers } from "ethers";
import afcContractABI from '../../../afcContractABI.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

function BurnPage() {
  const [burnAmount, setBurnAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7";

  const handleBurn = async () => {
    if (!burnAmount || isNaN(burnAmount) || Number(burnAmount) <= 0) {
      setMessage("Please enter a valid positive burn amount.");
      return;
    }

    try {
      if (!window.ethereum) {
        setMessage("MetaMask is not installed.");
        return;
      }

      setLoading(true);
      setMessage("");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);
      const amountInWei = ethers.utils.parseUnits(burnAmount, 18);

      const tx = await afcToken.burn(amountInWei);
      setMessage("Transaction sent. Waiting for confirmation...");
      await tx.wait();

      setMessage(`Successfully burned ${burnAmount} tokens.`);
      setBurnAmount("");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.data?.message || error.message || error.reason || "Transaction failed. Please try again.";
      setMessage(`Error burning tokens: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Burn Tokens</h2>}
    >
      <Head title="Burn AFC Tokens" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-8 shadow-xl">
            <h3 className="text-2xl font-semibold text-center mb-6">Burn Tokens</h3>
            <p className="text-sm mb-4 text-gray-300">Enter the amount of tokens you want to burn:</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-1">Amount to Burn</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBurn}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Burning...</span>
                </div>
              ) : (
                "Burn Tokens"
              )}
            </button>

            {message && (
              <div
                className={`mt-4 text-sm font-medium rounded-md p-3 ${
                  message.includes("Error")
                    ? "bg-red-100 text-red-800 border border-red-300"
                    : "bg-green-100 text-green-800 border border-green-300"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default BurnPage;
