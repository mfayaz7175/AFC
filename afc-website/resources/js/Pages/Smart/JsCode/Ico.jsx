import React, { useEffect, useState } from "react";
import { Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import NavLink from '@/Components/NavLink';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Ico = () => {
  // --- Live stats from our new backend table ---
  const [stats, setStats] = useState({
    participants: 0,
    eth_total: "0",
    afcoin_total: "0",
  });

  useEffect(() => {
    axios.get('/ico/stats')
      .then(({ data }) => setStats(data))
      .catch(err => console.error("Failed to load ICO stats:", err));
  }, []);

  // --- Static chart data remains as before ---
  const tokenData = {
    labels: ["Public Sale", "Team", "Advisors", "Reserve", "Marketing"],
    datasets: [{
      data: [50, 20, 10, 10, 10],
      backgroundColor: ["#1e88e5", "#ffcc00", "#e53935", "#43a047", "#8e24aa"],
      hoverBackgroundColor: ["#1565c0", "#e6b800", "#c62828", "#2e7d32", "#6a1b9a"],
    }],
  };

  // --- Build our detail cards, injecting live values ---
  const detailCards = [
    { icon: "fas fa-calendar-alt", title: "ICO Start Date", text: "March 1, 2025" },
    { icon: "fas fa-calendar-alt", title: "ICO End Date",   text: "March 31, 2025" },
    { icon: "fas fa-coins",        title: "Token Price",    text: "1 AFC = $0.10" },
    { icon: "fas fa-users",        title: "Participants",   text: stats.participants.toLocaleString() },
    { icon: "fas fa-wallet",       title: "ETH Raised",    text: `${parseFloat(stats.eth_total).toLocaleString()} ETH` },
    { icon: "fas fa-coins",        title: "AfCoin Sold",   text: parseFloat(stats.afcoin_total).toLocaleString() },
  ];

  // --- You can adjust this goal to your real ETH target ---
  const FUNDING_GOAL_ETH = 1000;
  const ethSoFar = parseFloat(stats.eth_total);
  const percentFunded = Math.min((ethSoFar / FUNDING_GOAL_ETH) * 100, 100).toFixed(1);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/img/bg5.JPG')" }}
    >
      <div className="backdrop-blur-sm">
        {/* Hero */}
        <section className="relative py-32 text-center bg-black/40">
          <NavLink
            href={route('dashboard')}
            active={route().current('dashboard')}
            className="absolute top-5 left-5 bg-black/50 backdrop-blur-sm hover:bg-black/60 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md transition"
          >
            <span>🏠</span>
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the AFCoin ICO</h1>
          <p className="text-lg md:text-xl mb-6">
            Be a part of the future of decentralized finance with AFCoin.
          </p>
          <Link href={route('ico.buy')}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-lg px-8 py-3 rounded-md font-semibold transition-shadow shadow-lg">
              Participate Now
            </button>
          </Link>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 space-y-12">

          {/* ICO Details */}
          <section className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {detailCards.map((c, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm p-4 rounded-lg shadow-inner text-center">
                  <i className={`${c.icon} text-2xl text-blue-400 mb-2`}></i>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-200">{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Funding Progress */}
          <section className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-3">Funding Progress</h2>
            <p className="mb-2">
              {percentFunded}% of {FUNDING_GOAL_ETH.toLocaleString()} ETH goal
            </p>
            <div className="w-full max-w-xl mx-auto bg-gray-700/30 h-5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full text-xs font-bold flex items-center justify-center"
                style={{ width: `${percentFunded}%` }}
              >
                {ethSoFar.toLocaleString()} ETH
              </div>
            </div>
          </section>

          {/* Token Allocation */}
          <section className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-lg grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">Token Allocation</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto border-collapse bg-black/30 rounded-lg shadow-inner">
                  <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                    <tr>
                      <th className="p-2">Allocation</th>
                      <th className="p-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenData.labels.map((lbl, i) => (
                      <tr key={i} className="border-b border-gray-600 hover:bg-gray-800/50">
                        <td className="p-2">{lbl}</td>
                        <td className="p-2">{tokenData.datasets[0].data[i]}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <Pie data={tokenData} />
            </div>
          </section>

          {/* Roadmap */}
          <section className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-lg overflow-hidden">
            <h2 className="text-center text-2xl font-semibold mb-8">Roadmap</h2>
            <div className="relative pl-12">
              <div className="absolute left-6 top-0 w-1 bg-blue-400 h-full"></div>
              <div className="space-y-8">
                {[
                  ["Q1 2025", "Project Initiation and Team Formation"],
                  ["Q2 2025", "Development of Core Platform"],
                  ["Q3 2025", "Beta Testing and Community Feedback"],
                  ["Q4 2025", "Official Platform Launch"],
                ].map(([q, desc], idx) => (
                  <div key={idx} className="relative flex items-start">
                    <div className="absolute left-3 mt-1 w-4 h-4 bg-blue-400 rounded-full"></div>
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg shadow-inner w-full">
                      <h3 className="text-lg font-semibold">{q}</h3>
                      <p className="text-sm text-gray-200 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Whitepaper */}
          <section className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-3">Learn More</h2>
            <p className="mb-4 text-sm text-gray-200">
              For a detailed overview of the AFCoin project, please refer to our whitepaper.
            </p>
            <a href="/whitepaper">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 text-sm font-bold rounded-md transition-shadow shadow-md">
                <i className="fas fa-file-alt mr-1"></i>Download Whitepaper
              </button>
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Ico;
