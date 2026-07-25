import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import afcContractABI from "../../../afcContractABI.jsx";
import contractConfig from '../../../contractConfig';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DashboardPage() {
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("0");
  const [totals, setTotals] = useState({
    totalMint: "0",
    totalApprove: "0",
    totalTransferFrom: "0",
    totalReceived: "0",
    lastMint: null,
    lastApprove: null,
    lastTransferFrom: null,
    lastReceived: null,
  });
  const [allEvents, setAllEvents] = useState([]);

  const contractAddress = contractConfig.afCoinAddress;
  const decimals = 18;

  useEffect(() => {
    async function connectWallet() {
      if (!window.ethereum) {
        setMessage("MetaMask not detected.");
        return;
      }
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length) setAccount(accounts[0]);
      } catch (err) {
        setMessage("Error connecting wallet: " + err.message);
      }
    }
    connectWallet();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!window.ethereum || !account) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, afcContractABI, provider);
      try {
        const balBN = await contract.balanceOf(account);
        setBalance(ethers.utils.formatUnits(balBN, decimals));

        const approvalEvents = await contract.queryFilter(contract.filters.Approval());
        const transferEvents = await contract.queryFilter(contract.filters.Transfer());

        const eventsCombined = [...approvalEvents, ...transferEvents].sort((a, b) =>
          a.blockNumber === b.blockNumber ? a.logIndex - b.logIndex : a.blockNumber - b.blockNumber
        );

        const eventsWithDates = await Promise.all(
          eventsCombined.map(async event => {
            const block = await provider.getBlock(event.blockNumber);
            return { ...event, date: new Date(block.timestamp * 1000).toLocaleString() };
          })
        );
        setAllEvents(eventsWithDates);

        let mintBN = ethers.BigNumber.from(0);
        let approveBN = ethers.BigNumber.from(0);
        let outBN = ethers.BigNumber.from(0);
        let inBN = ethers.BigNumber.from(0);
        let last = { mint: null, approve: null, out: null, in: null };

        transferEvents.forEach(evt => {
          const { from, to, value } = evt.args;
          if (from === ethers.constants.AddressZero) {
            mintBN = mintBN.add(value);
            last.mint = last.mint?.blockNumber < evt.blockNumber ? evt : last.mint;
          }
          if (from.toLowerCase() === account.toLowerCase()) {
            outBN = outBN.add(value);
            last.out = last.out?.blockNumber < evt.blockNumber ? evt : last.out;
          }
          if (to.toLowerCase() === account.toLowerCase()) {
            inBN = inBN.add(value);
            last.in = last.in?.blockNumber < evt.blockNumber ? evt : last.in;
          }
        });

        approvalEvents.forEach(evt => {
          const { owner, value } = evt.args;
          if (owner.toLowerCase() === account.toLowerCase()) {
            approveBN = approveBN.add(value);
            last.approve = last.approve?.blockNumber < evt.blockNumber ? evt : last.approve;
          }
        });

        setTotals({
          totalMint: ethers.utils.formatUnits(mintBN, decimals),
          totalApprove: ethers.utils.formatUnits(approveBN, decimals),
          totalTransferFrom: ethers.utils.formatUnits(outBN, decimals),
          totalReceived: ethers.utils.formatUnits(inBN, decimals),
          lastMint: last.mint,
          lastApprove: last.approve,
          lastTransferFrom: last.out,
          lastReceived: last.in,
        });
      } catch (err) {
        console.error(err);
        setMessage("Error fetching data: " + err.message);
      }
    }
    fetchData();
  }, [account]);

  return (
    <AuthenticatedLayout
      header={<h2 className="text-white font-semibold text-lg leading-tight">Token Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-8">

          {/* Overview Card */}
          <div className="relative bg-[rgba(0,0,0,0.4)] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50 rounded-2xl" />
            <div className="relative z-10 space-y-4 text-white">
              {message && <p className="text-red-500">{message}</p>}
              <p><span className="font-semibold">Account:</span> {account || 'Not connected'}</p>
              <p><span className="font-semibold">Balance:</span> {balance} AFC</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {['Minted','Approved','Sent','Received'].map((label, idx) => (
                  <div key={idx} className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-gray-300">Total {label}:</p>
                    <p className="text-xl font-bold">{[totals.totalMint,totals.totalApprove,totals.totalTransferFrom,totals.totalReceived][idx]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Last Events */}
          <div className="relative bg-[rgba(0,0,0,0.4)] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50 rounded-2xl" />
            <div className="relative z-10 text-white space-y-6">
              {['lastMint','lastApprove','lastTransferFrom','lastReceived'].map((key, idx) => (
                <div key={idx}>
                  <p className="font-semibold">Last {['Mint','Approve','Sent','Received'][idx]}:</p>
                  {totals[key] ? (
                    <pre className="bg-white/20 p-2 rounded-lg max-h-24 overflow-auto">
                      {JSON.stringify(totals[key].args, null, 2)}
                    </pre>
                  ) : <p className="text-gray-400">No data</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Events Table */}
          <div className="relative bg-[rgba(0,0,0,0.4)] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 overflow-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50 rounded-2xl" />
            <div className="relative z-10">
              <h3 className="text-white text-xl font-semibold mb-4">Event History</h3>
              <table className="min-w-full table-auto text-white border-separate border-spacing-0">
                <thead>
                  <tr className="bg-white/10">
                    {['Event','Tx Hash','Block','Date','Details'].map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left text-sm">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allEvents.map((e, i) => (
                    <tr key={i} className="border-b border-white/20 hover:bg-white/5">
                      <td className="px-3 py-1">{e.event}</td>
                      <td className="px-3 py-1 break-all text-xs">{e.transactionHash}</td>
                      <td className="px-3 py-1">{e.blockNumber}</td>
                      <td className="px-3 py-1 text-sm">{e.date}</td>
                      <td className="px-3 py-1 max-w-xs">
                        <pre className="bg-white/10 p-1 rounded text-xs max-h-20 overflow-auto">
                          {JSON.stringify(e.args, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
