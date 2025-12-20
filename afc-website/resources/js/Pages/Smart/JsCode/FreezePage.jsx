
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '../../../afcContractABI.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const contractAddress = '0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7';

function FreezePage() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isFrozen, setIsFrozen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setCurrentAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (newAccounts) => {
            setCurrentAccount(newAccounts[0]);
            setMessage(`Account changed to ${newAccounts[0]}`);
            checkFrozenStatus(newAccounts[0]);
          });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          await checkFrozenStatus(accounts[0]);
        } catch (err) {
          setMessage(`Error connecting to MetaMask: ${err.message}`);
        }
      } else {
        setMessage('MetaMask is not installed. Please install MetaMask to use this dApp.');
      }
    };

    connectWallet();
  }, []);

  const checkFrozenStatus = async (account) => {
    if (!account) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, provider);
      const frozenStatus = await afcToken.isFrozen(account);
      setIsFrozen(frozenStatus);
    } catch (err) {
      setMessage('Failed to fetch frozen status.');
    }
  };

  const handleFreezeToggle = async () => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      setMessage('Invalid account address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);

      const tx = isFrozen ? await afcToken.unfreeze() : await afcToken.freeze();
      await tx.wait();

      setIsFrozen(!isFrozen);
      setMessage(`Account successfully ${isFrozen ? 'unfrozen' : 'frozen'}.`);
    } catch (err) {
      setMessage(`Transaction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Freeze/Unfreeze Account
        </h2>
      }
    >
      <Head title="afc" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-center mb-4">Manage Account Status</h3>
            <p className="text-sm text-center mb-6">
              {isFrozen
                ? 'Your account is currently frozen. Click below to unfreeze it.'
                : 'Your account is active. Click below to freeze it.'}
            </p>

            <button
              onClick={handleFreezeToggle}
              disabled={isLoading}
              className={`w-full py-2 rounded-md font-semibold text-white transition duration-300 ${
                isFrozen
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              } disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : isFrozen ? 'Unfreeze Account' : 'Freeze Account'}
            </button>

            {message && (
              <div
                className={`mt-4 text-sm font-medium rounded-md p-3 ${
                  message.includes('Error') || message.includes('failed')
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-green-100 text-green-800 border border-green-300'
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

export default FreezePage;
