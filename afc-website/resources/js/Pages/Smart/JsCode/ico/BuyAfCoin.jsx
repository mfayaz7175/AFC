import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { ethers } from 'ethers';
import AfCoinICO_ABI from '../../../../AfCoinICO_ABI';

const AF_COIN_ICO_ADDRESS = "0x7DF28381Ef3CbD7335d0c3e95B71d44812ECa42B";
const AFCOIN_DECIMALS     = 18;

const BuyAfCoin = () => {
  const [provider, setProvider]   = useState(null);
  const [signer, setSigner]       = useState(null);
  const [contract, setContract]   = useState(null);
  const [account, setAccount]     = useState('');
  const [rate, setRate]           = useState('0');
  const [ethAmount, setEthAmount] = useState('0.1');
  const [txHash, setTxHash]       = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  // Connect to MetaMask & instantiate contract
  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        setError('MetaMask not found');
        return;
      }
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer   = _provider.getSigner();
        const _acct     = await _signer.getAddress();
        const _ico      = new ethers.Contract(
          AF_COIN_ICO_ADDRESS,
          AfCoinICO_ABI,
          _signer
        );
        setProvider(_provider);
        setSigner(_signer);
        setAccount(_acct);
        setContract(_ico);
      } catch (err) {
        setError(err.message);
      }
    };
    init();
  }, []);

  // Fetch the current rate
  useEffect(() => {
    if (!contract) return;
    contract.rate()
      .then(r => setRate(r.toString()))
      .catch(err => console.error(err));
  }, [contract]);

  // Handle on-chain purchase + backend record
  const handleBuy = async (e) => {
    e.preventDefault();
    setError('');
    setTxHash('');
    setLoading(true);

    try {
      // a) Submit on-chain
      const value   = ethers.utils.parseEther(ethAmount);
      const tx      = await contract.buyTokens({ value });
      const receipt = await tx.wait();

      // b) Extract raw token amount from the purchase event
      const purchaseEvent = receipt.events?.find(ev => ev.event === 'TokensPurchased');
      const rawAmount     = purchaseEvent?.args?.amount;

      // c) Convert to human-readable string
      const afcoinAmount = rawAmount
        ? ethers.utils.formatUnits(rawAmount, AFCOIN_DECIMALS)
        : (parseFloat(ethAmount) * parseFloat(rate)).toString();

      // d) Record in your Laravel backend via Inertia
      await Inertia.post('/ico/store', {
        wallet_address: account,
        eth_amount:     ethAmount,
        afcoin_amount:  afcoinAmount,
        rate:           rate,
        tx_hash:        receipt.transactionHash,
      });

      setTxHash(receipt.transactionHash);
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('/img/bg5.JPG')" }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex-grow flex flex-col">
        {/* Dashboard Link */}
        <Link
          href="/dashboard"
          className="absolute top-5 left-5 bg-black/50 backdrop-blur-sm hover:bg-black/60 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md transition"
        >
          <span>🏠</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        {/* Centered form card */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">
              Buy AfCoins ICO
            </h2>

            {error && (
              <div
                className="mb-4 p-3 bg-red-600 bg-opacity-50 text-red-100 rounded"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            {!account ? (
              <p className="text-center">Connecting to MetaMask…</p>
            ) : (
              <form onSubmit={handleBuy} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Account</label>
                  <div className="text-xs truncate">{account}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rate (1 ETH = <span className="font-bold">{rate}</span> AfCoin)
                  </label>
                </div>

                <div>
                  <label htmlFor="ethAmount" className="block text-sm font-medium mb-1">
                    ETH to Spend
                  </label>
                  <input
                    id="ethAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={ethAmount}
                    onChange={e => setEthAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                    placeholder="0.1"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Processing…' : 'Buy AfCoins'}
                </button>

                {txHash && (
                  <div
                    className="mt-4 p-3 bg-green-600 bg-opacity-50 text-green-100 rounded text-sm text-center"
                    aria-live="polite"
                  >
                    ✅ Purchased! TX:{' '}
                    <a
                      href={`https://ganache.blockexplorer/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {txHash.slice(0, 10)}…{txHash.slice(-8)}
                    </a>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyAfCoin;

