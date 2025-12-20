import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '../../../afcContractABI.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TransferPage() {
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = '0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7';

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => setSenderAddress(accounts[0]))
        .catch((err) => console.error("Error requesting accounts: ", err));
    } else {
      setMessage("MetaMask not detected. Please install it.");
    }
  }, []);

  const handleTransfer = async () => {
    if (!senderAddress || !recipientAddress || !amount) {
      setMessage('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      if (!window.ethereum) {
        setMessage('MetaMask is not installed');
        setIsLoading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const afcToken = new ethers.Contract(contractAddress, afcContractABI, signer);
      const amountInWei = ethers.utils.parseUnits(amount, 18);

      const senderBalanceBefore = await afcToken.balanceOf(senderAddress);
      if (senderBalanceBefore.lt(amountInWei)) {
        setMessage('Sender does not have enough balance');
        setIsLoading(false);
        return;
      }

      const tx = await afcToken.transfer(recipientAddress, amountInWei);
      await tx.wait();

      const senderBalanceAfter = await afcToken.balanceOf(senderAddress);
      const recipientBalanceAfter = await afcToken.balanceOf(recipientAddress);

      setMessage(
        `Transaction successful! Sender balance before: ${ethers.utils.formatUnits(
          senderBalanceBefore,
          18
        )} AFC, Sender balance after: ${ethers.utils.formatUnits(
          senderBalanceAfter,
          18
        )} AFC, Recipient balance: ${ethers.utils.formatUnits(
          recipientBalanceAfter,
          18
        )} AFC`
      );

      setRecipientAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-white font-semibold text-lg leading-tight">
          <i className="fas fa-exchange-alt mr-2"></i> Transfer AfCoin
        </h2>
      }
    >
      <Head title="Transfer AfCoin" />

      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Glass-morphism wrapper */}
          <div
            className="relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
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
            <div className="relative z-10">
              <h3 className="text-center text-2xl font-bold text-white mb-6">
                Transfer AfCoin
              </h3>

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="senderAddress"
                    className="block text-sm font-medium text-white"
                  >
                    Sender Address
                  </label>
                  <input
                    type="text"
                    id="senderAddress"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="recipientAddress"
                    className="block text-sm font-medium text-white"
                  >
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipientAddress"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:bg-gray-700"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-white"
                  >
                    Amount (AFC)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:bg-gray-700"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:opacity-50 transition"
                  onClick={handleTransfer}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="inline-block animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5" />
                  ) : (
                    'Transfer AFC'
                  )}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-6 p-4 rounded-lg text-center ${
                    message.includes('Error') ? 'bg-red-600' : 'bg-green-600'
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
