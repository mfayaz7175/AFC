

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import afcContractABI from '../../../afcContractABI.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TransferFromPage() {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [allowanceSummary, setAllowanceSummary] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const contractAddress = "0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7";

  useEffect(() => {
    window.ethereum
      ?.request({ method: "eth_requestAccounts" })
      .then(accounts => {
        if (accounts.length) setConnectedAddress(accounts[0]);
        else setMessage("No wallet connected.");
      })
      .catch(err => setMessage(`Error connecting wallet: ${err.message}`));
  }, []);

  const fetchAllowanceSummary = async () => {
    if (!connectedAddress) {
      setMessage("Connect your wallet to view allowances.");
      return;
    }
    setIsLoading(true);
    setMessage("");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const token = new ethers.Contract(contractAddress, afcContractABI, provider);

      // for demo: just fetch each distinct owner’s allowance
      const owners = [ownerAddress].filter(Boolean);
      const summary = {};
      for (const owner of owners) {
        const allowanceBN = await token.allowance(owner, connectedAddress);
        summary[owner] = {
          approved: parseFloat(ethers.utils.formatUnits(allowanceBN, 18)),
          spent: 0,
          remaining: parseFloat(ethers.utils.formatUnits(allowanceBN, 18))
        };
      }

      setAllowanceSummary(summary);
    } catch (err) {
      console.error(err);
      setMessage(`Error fetching data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferFrom = async () => {
    if (!ownerAddress || !recipientAddress || !transferAmount) {
      setMessage("Please fill in all transfer details.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const token = new ethers.Contract(contractAddress, afcContractABI, signer);

      const formattedAmount = ethers.utils.parseUnits(transferAmount, 18);

      // 1) Check allowance directly
      const allowanceBN = await token.allowance(ownerAddress, await signer.getAddress());
      if (allowanceBN.lt(formattedAmount)) {
        setMessage("⚠️ Transfer amount exceeds allowance. Please approve more first.");
        setIsLoading(false);
        return;
      }

      // 2) Perform the transferFrom
      const tx = await token.transferFrom(ownerAddress, recipientAddress, formattedAmount);
      setMessage("⏳ Transaction submitted. Waiting for confirmation…");
      await tx.wait();

      // 3) Success: clear inputs + refresh
      setMessage("✅ Transfer successful!");
      setRecipientAddress("");
      setTransferAmount("");
      fetchAllowanceSummary();

    } catch (err) {
      console.error(err);
      const reason = err.data?.message || err.message;
      setMessage(`Transfer failed: ${reason}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Transfer From</h2>}
    >
      <Head title="TransferFrom AFC" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">Allowance Summary</h3>
            {connectedAddress ? (
              <p className="text-gray-300 mb-4">
                Connected: <code>{connectedAddress}</code>
              </p>
            ) : (
              <p className="text-red-500 mb-4">No wallet connected.</p>
            )}

            <button
              onClick={fetchAllowanceSummary}
              disabled={isLoading}
              className="mb-6 w-full py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Loading…" : "Fetch Allowance"}
            </button>

            {message && (
              <div
                className={`mb-6 p-3 rounded ${
                  message.startsWith("Error") || message.startsWith("⚠️")
                    ? "bg-red-600"
                    : "bg-green-600"
                } text-white`}
              >
                {message}
              </div>
            )}

            {Object.entries(allowanceSummary).length > 0 && (
              <table className="w-full mb-6 text-white">
                <thead>
                  <tr>
                    <th className="border-b p-2 text-left">Owner</th>
                    <th className="border-b p-2 text-left">Remaining AFC</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(allowanceSummary).map(([owner, data]) => (
                    <tr key={owner}>
                      <td className="p-2">{owner}</td>
                      <td className="p-2">{data.remaining.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h3 className="text-2xl font-semibold text-white mb-4">Transfer From</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Owner Address</label>
                <input
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  value={ownerAddress}
                  onChange={e => setOwnerAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Recipient Address</label>
                <input
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  value={recipientAddress}
                  onChange={e => setRecipientAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Amount (AFC)</label>
                <input
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  value={transferAmount}
                  onChange={e => setTransferAmount(e.target.value)}
                  type="number"
                />
              </div>
              <button
                onClick={handleTransferFrom}
                disabled={isLoading}
                className="w-full py-3 bg-green-600 rounded-full text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? "Processing…" : "Transfer From"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
