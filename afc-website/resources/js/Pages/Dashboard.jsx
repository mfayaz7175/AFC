import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import afcContractABI from '@/afcContractABI.jsx';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LargCard from '@/Components/Dashboard/LargCard';
import BigCard from '@/Components/Dashboard/BigCard';
import SmallCard from '@/Components/Dashboard/SmallCard';
import MidleCard from '@/Components/Dashboard/MidleCard';
import Header from '@/Components/News/Header';
import Footer from '@/Components/News/Footer';
import { useTranslation } from 'react-i18next';
import GlobalAdPopup from '@/Components/GlobalAdPopup';

const DashboardMainContent = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState("");
  const [msg, setMsg] = useState("");
  const [balance, setBalance] = useState("0");
  const [totals, setTotals] = useState({
    totalMint: "0",
    totalApprove: "0",
    totalTransferFrom: "0",
    totalReceived: "0",
  });
  const [allEvents, setAllEvents] = useState([]);
  const [mintEvents, setMintEvents] = useState([]);
  const contractAddress = "0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7";
  const decimals = 18;

  // Connect wallet
  useEffect(() => {
    // Check if MetaMask (or any ethereum provider) is installed
    if (!window.ethereum) {
      // Set a message to alert the user
      return setMsg("MetaMask is not installed. Please install MetaMask to connect your wallet.");
    }

    // Request account access if MetaMask is available
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(acc => {
        if (acc.length > 0) {
          setAccount(acc[0]);
        } else {
          setMsg("MetaMask is installed but no account is connected. Please connect your wallet.");
        }
      })
      .catch(err => setMsg("Failed to connect wallet. Please open MetaMask and connect your account."));
  }, []);


  // Fetch on‑chain data once an account is connected
  useEffect(() => {
    if (!window.ethereum || !account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, afcContractABI, provider);
    (async () => {
      try {
        // Get account balance
        const balBN = await contract.balanceOf(account);
        setBalance(ethers.utils.formatUnits(balBN, decimals));

        // Fetch Approval and Transfer events
        const approvals = await contract.queryFilter(contract.filters.Approval());
        const transfers = await contract.queryFilter(contract.filters.Transfer());

        // Combine and sort events
        const events = [...approvals, ...transfers].sort(
          (a, b) => a.blockNumber - b.blockNumber || a.logIndex - b.logIndex
        );

        // Add the block timestamp (converted to a locale string) to each event
        const eventsWithDates = await Promise.all(
          events.map(async event => {
            const block = await provider.getBlock(event.blockNumber);
            return { ...event, date: new Date(block.timestamp * 1000).toLocaleString() };
          })
        );

        // Filter events related to the connected account
        const filteredEvents = eventsWithDates.filter(event => {
          if (event.event === "Approval") {
            return event.args.owner.toLowerCase() === account.toLowerCase();
          } else if (event.event === "Transfer") {
            return (
              event.args.from.toLowerCase() === account.toLowerCase() ||
              event.args.to.toLowerCase() === account.toLowerCase()
            );
          }
          return false;
        });
        setAllEvents(filteredEvents);

        // Totals calculations
        let totalMint = ethers.BigNumber.from(0),
          totalApprove = ethers.BigNumber.from(0),
          totalTransferFrom = ethers.BigNumber.from(0),
          totalReceived = ethers.BigNumber.from(0);
        transfers.forEach(({ args: { from, to, value } }) => {
          if (from === ethers.constants.AddressZero)
            totalMint = totalMint.add(value);
          if (from.toLowerCase() === account.toLowerCase())
            totalTransferFrom = totalTransferFrom.add(value);
          if (to.toLowerCase() === account.toLowerCase())
            totalReceived = totalReceived.add(value);
        });
        approvals.forEach(event => {
          if (event.args.owner.toLowerCase() === account.toLowerCase())
            totalApprove = totalApprove.add(event.args.value);
        });
        setTotals({
          totalMint: ethers.utils.formatUnits(totalMint, decimals),
          totalApprove: ethers.utils.formatUnits(totalApprove, decimals),
          totalTransferFrom: ethers.utils.formatUnits(totalTransferFrom, decimals),
          totalReceived: ethers.utils.formatUnits(totalReceived, decimals),
        });

        // Filter mint events (Transfer events from the zero address to the connected account)
        const mintTransferEvents = transfers.filter(event =>
          event.args.from.toLowerCase() === ethers.constants.AddressZero.toLowerCase() &&
          event.args.to.toLowerCase() === account.toLowerCase()
        );
        const mintEventsWithDates = await Promise.all(
          mintTransferEvents.map(async event => {
            const block = await provider.getBlock(event.blockNumber);
            return { ...event, date: new Date(block.timestamp * 1000).toLocaleString() };
          })
        );
        setMintEvents(mintEventsWithDates);

      } catch (err) {
        console.error(err);
        setMsg(t("dashboard.error_fetching_data") + err.message);
      }
    })();
  }, [account, t]);

  return (
    <Col xs={12} className="main-content p-5">
      <div className="line d-flex align-items-center justify-content-between mb-4">
        <h2 className="main-heading text-white">
          {t("dashboard.welcome", { user: account ? `${account.slice(0, 6)}...${account.slice(-4)}` : t("dashboard.default_user") })}
        </h2>
        <Link href="/ico">
          <Button variant="warning" className="px-4 py-2 ico-btn">
            <i className="fa-solid fa-coins me-2"></i> {t("dashboard.participate_ico")}
          </Button>
        </Link>
      </div>
      {/* Display error message if MetaMask is not installed or other errors occur */}
      {/* {msg && <p className="text-white p-2 px-4 bg-red-900">{msg}</p>} */}
      {msg && (
  <div className="relative bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-4 flex items-center shadow">
    <i className="fa-solid fa-triangle-exclamation mr-2 text-yellow-600"></i>
    <span className="flex-1">{msg}</span>
    <button onClick={() => setMsg("")} className="ml-4 text-xl font-bold text-yellow-700 hover:text-yellow-900">&times;</button>
  </div>
)}
      <p className="mb-3 text-white">{t("dashboard.manage_account")}</p>

      {/* Summary Cards */}
      <Row className="mb-3">
        <MidleCard
          icon="fas fa-wallet"
          title={t("dashboard.account_balance")}
          value={balance}
          linkText={t("dashboard.my_allowance")}
          routeName="allowance"            // <-- routes to /allowance
        />

        <MidleCard
          icon="fas fa-bar-chart"
          title={t("dashboard.minted_coins")}
          value={totals.totalMint}
          linkText={t("dashboard.mine_tokens")}
          routeName="mint"                 // <-- routes to /mint
        />

        <MidleCard
          icon="fas fa-comment-alt"
          title={t("dashboard.afc_messages")}
          value={t("dashboard.afc_message_info")}
          linkText={t("dashboard.details")}
          routeName=""               // <-- routes to /notify
        />
      </Row>

      {/* Aggregated Info Cards */}
      <Row className="mb-3">
        <SmallCard label={t("dashboard.total_approved")} value={totals.totalApprove} />
        <SmallCard label={t("dashboard.total_transferred")} value={totals.totalTransferFrom} />
        <SmallCard label={t("dashboard.total_received")} value={totals.totalReceived} />
        <SmallCard label={t("dashboard.token_supply")} value="1000,000" />
      </Row>

      {/* Profile & Admin Overview */}
      <Row className="line mb-3">
        <BigCard
          totals={totals}
          btnName={t("dashboard.edit_profile")}
          title={t("dashboard.profile_overview")}
          first="mahdi"
          second="mahdi@gmail.com"
          third={account}
          firstLabel={t("dashboard.name_label")}
          secondLabel={t("dashboard.email_label")}
          thirdLabel={t("dashboard.wallet_address_label")}
          routeName="profile.edit"             // ← this makes the button link to Route::name('profile.edit')
        />

        <BigCard
          totals={totals}
          btnName={t("dashboard.view_details")}
          title={t("dashboard.admin_overview")}
          first="10000 AFC"
          second="0 Afc"
          third="1,250"
          firstLabel={t("dashboard.total_minted_tokens_label")}
          secondLabel={t("dashboard.total_minted_tokens_label")}
          thirdLabel={t("dashboard.total_users_label")}
          routeName=""              // ← for example, link to your admin panel
        />
      </Row>
      <GlobalAdPopup/>


      <LargCard data={''} title={t("dashboard.notifications")} />
      <LargCard data={''} title={t("dashboard.recent_activity")} />
      <LargCard data={allEvents} title={t("dashboard.transaction_history")} />
      <LargCard data={mintEvents} title={t("dashboard.mint_history")} />
    </Col>
  );
};

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <AuthenticatedLayout>
      <Head title={t("dashboard.title")} />
      <Row>
        <DashboardMainContent />
        <Footer />
      </Row>
    </AuthenticatedLayout>
  );
}
