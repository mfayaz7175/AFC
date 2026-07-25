import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '../../../afcContractABI.jsx';
import contractConfig from '../../../contractConfig';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ApprovePage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [spenderAddress, setSpenderAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [approveAddress, setApproveAddress] = useState('');

  const contractAddress = contractConfig.afCoinAddress;

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            setApproveAddress(accounts[0]);
          } else {
            setMessage('No accounts found in MetaMask.');
          }
        })
        .catch((err) => setMessage('Error requesting accounts: ' + err.message));
    } else {
      setMessage('MetaMask not detected. Please install it.');
    }
  }, []);

  const handleApprove = async () => {
    if (!spenderAddress || !amount) {
      setMessage('Please provide both spender address and amount.');
      return;
    }
    if (!ethers.utils.isAddress(spenderAddress)) {
      setMessage('Invalid spender address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);
      const amountInWei = ethers.utils.parseUnits(amount, 18);

      if (!approveAddress) {
        setMessage('Approve address not found.');
        setIsLoading(false);
        return;
      }

      const tx = await afcToken.approve(spenderAddress, amountInWei, { gasLimit: 2000000 });
      setMessage('Transaction sent, waiting for confirmation...');
      await tx.wait();
      setMessage(`Successfully approved ${amount} AFC to spender ${spenderAddress}.`);
      setSpenderAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      if (err.code === 'CALL_EXCEPTION') {
        setMessage('Transaction reverted. Check contract permissions or conditions.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setMessage('Insufficient funds in your account to pay for gas.');
      } else {
        setMessage('Error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-white font-semibold text-lg leading-tight">
          <i className="fas fa-check-circle mr-2 text-white"></i> Approve Tokens
        </h2>
      }
    >
      <Head title="Approve Tokens" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Glass-morphism container */}
          <div
            className="relative p-8 rounded-2xl shadow-xl transform transition-transform hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Blurred gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
              style={{ filter: 'blur(12px)' }}
            />

            {/* Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl font-bold text-center mb-6">Approve Tokens</h3>
              <p className="mb-6 text-gray-300 text-center">
                Enter the spender address and the amount you want to approve:
              </p>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Spender Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:bg-gray-700"
                  value={spenderAddress}
                  onChange={(e) => setSpenderAddress(e.target.value)}
                  placeholder="Enter spender address"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Amount to Approve</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:bg-gray-700"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to approve"
                />
              </div>

              <button
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full flex justify-center items-center transition disabled:opacity-50"
                onClick={handleApprove}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  'Approve Tokens'
                )}
              </button>

              {message && (
                <div
                  className={`mt-6 px-4 py-3 rounded-md text-center ${
                    message.includes('Error') || message.includes('reverted') || message.includes('Invalid')
                      ? 'bg-red-600'
                      : 'bg-green-600'
                  } text-white`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
