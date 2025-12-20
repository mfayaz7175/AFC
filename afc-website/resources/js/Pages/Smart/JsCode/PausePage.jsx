import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '../../../afcContractABI.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const contractAddress = '0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7';

export default function PausePage() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setCurrentAccount(accounts[0]);
          window.ethereum.on('accountsChanged', (newAccounts) => {
            setCurrentAccount(newAccounts[0]);
            setMessage(`Account changed to ${newAccounts[0]}`);
            checkPausedStatus();
          });
          window.ethereum.on('chainChanged', () => window.location.reload());
          await checkPausedStatus();
        } catch (err) {
          setMessage(`Error connecting to MetaMask: ${err.message}`);
        }
      } else {
        setMessage('MetaMask is not installed. Please install MetaMask to use this dApp.');
      }
    };
    connectWallet();
  }, []);

  const checkPausedStatus = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, provider);
      const pausedStatus = await afcToken.paused();
      setIsPaused(pausedStatus);
    } catch {
      setMessage('Failed to fetch paused status.');
    }
  };

  const handlePauseToggle = async () => {
    setShowModal(false);
    setIsLoading(true);
    setMessage('');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);
      const tx = isPaused ? await afcToken.unpause() : await afcToken.pause();
      await tx.wait();
      setIsPaused(!isPaused);
      setMessage(`Contract successfully ${isPaused ? 'unpaused' : 'paused'}.`);
    } catch (err) {
      setMessage(`Transaction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-white font-semibold text-lg leading-tight">Contract Pause</h2>}>
      <Head title="Pause / Unpause Contract" />

      <div className="py-12">
        <div className="max-w-md mx-auto px-4">
          <div
            className="relative bg-[rgba(0,0,0,0.7)] backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-transform hover:scale-105"
          >
            <div className="relative z-10 text-center text-white space-y-6">
              <p className="text-sm">Connected Wallet:</p>
              <p className="font-mono text-xs break-all">{currentAccount || 'Not connected'}</p>

              <button
                onClick={() => setShowModal(true)}
                disabled={isLoading}
                className={`w-full py-3 text-lg font-semibold rounded-full transition ${
                  isPaused
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                } disabled:opacity-50`}
              >
                {isLoading
                  ? 'Processing...'
                  : isPaused
                  ? 'Unpause Contract'
                  : 'Pause Contract'}
              </button>

              {message && <p className="text-yellow-300 text-sm">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

          <div className="relative z-10 bg-[rgba(15,15,15,0.8)] border border-white/20 rounded-2xl shadow-2xl w-80 p-6 space-y-4 text-white">
            <h3 className="text-xl font-semibold">Confirm Action</h3>
            <p>
              Are you sure you want to{' '}
              <span className="font-bold">{isPaused ? 'unpause' : 'pause'}</span> the contract?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePauseToggle}
                className={`px-4 py-2 rounded-full transition ${
                  isPaused
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
