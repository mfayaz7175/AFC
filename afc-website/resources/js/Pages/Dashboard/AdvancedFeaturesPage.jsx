import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from './BlurHeader';
import './style/AdvancedFeaturesPage.css';
import Footer from '@/Components/News/Footer';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdvancedFeaturesPage = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      question: t('advanced_features.faq_question_1'),
      answer: t('advanced_features.faq_answer_1'),
    },
    {
      question: t('advanced_features.faq_question_2'),
      answer: t('advanced_features.faq_answer_2'),
    },
    {
      question: t('advanced_features.faq_question_3'),
      answer: t('advanced_features.faq_answer_3'),
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);
  const [bitcoinChartData, setBitcoinChartData] = useState(null);
  const [ethereumChartData, setEthereumChartData] = useState(null);
  const [cryptoNews, setCryptoNews] = useState([]);

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  // Fetch live Bitcoin price data for the last 7 days
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
      .then(response => response.json())
      .then(data => {
        const labels = data.prices.map(item => {
          const date = new Date(item[0]);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        const prices = data.prices.map(item => item[1]);
        setBitcoinChartData({
          labels,
          datasets: [
            {
              label: t('advanced_features.bitcoin_price_usd'),
              data: prices,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      })
      .catch(console.error);
  }, [t]);

  // Fetch live Ethereum volume data for the last 7 days
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7')
      .then(response => response.json())
      .then(data => {
        const labels = data.total_volumes.map(item => {
          const date = new Date(item[0]);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        const volumes = data.total_volumes.map(item => item[1]);
        setEthereumChartData({
          labels,
          datasets: [
            {
              label: t('advanced_features.ethereum_trading_volume'),
              data: volumes,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(console.error);
  }, [t]);

  // Fetch live cryptocurrency news (using NewsAPI as an example)
  useEffect(() => {
    fetch('https://cryptopanic.com/api/v1/')
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setCryptoNews(data.articles);
        }
      })
      .catch(console.error);
  }, []);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: t('advanced_features.bitcoin_price_trend_live') },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: t('advanced_features.ethereum_trading_volume_live') },
    },
  };

  // Sample Doughnut chart for market cap distribution (static sample data)
  const doughnutChartData = {
    labels: [t('advanced_features.bitcoin'), t('advanced_features.ethereum'), t('advanced_features.others')],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: t('advanced_features.crypto_market_cap_distribution') },
    },
  };

  // Combine news headlines for ticker text
  const tickerText = cryptoNews.length > 0
    ? cryptoNews.map(news => news.title).join(' | ')
    : t('advanced_features.loading_live_news');

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen p-8 my-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('advanced_features.manage_ads')}
            </p>
          </div>

          {/* Main Content Card */}
          <div className="relative z-10 max-w-6xl mx-auto bg-gray-900 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-600">
              <h1 className="text-3xl font-bold text-white">{t('advanced_features.features')}</h1>

            </header>

            <div className="space-y-10">
              {/* Live News Ticker */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.live_news_ticker')}</h2>
                <div className="ticker-container bg-gray-800 p-2 rounded overflow-hidden">
                  <div className="ticker-text animate-marquee whitespace-nowrap text-white">
                    {tickerText}
                  </div>
                </div>
              </section>

              {/* Latest News Cards */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.latest_news')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cryptoNews.length > 0 ? (
                    cryptoNews.slice(0, 6).map((news, index) => (
                      <div key={index} className="border border-gray-700 rounded-lg overflow-hidden shadow-sm flex flex-col bg-gray-800">
                        {news.urlToImage && (
                          <img
                            src={news.urlToImage}
                            alt={news.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-xl font-semibold mb-2 text-white">{news.title}</h3>
                          <p className="text-sm mb-2 flex-grow text-white">
                            {news.description ? news.description : t('advanced_features.no_description')}
                          </p>
                          <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline mt-auto"
                          >
                            {t('advanced_features.read_more')}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">{t('advanced_features.loading_latest_news')}</p>
                  )}
                </div>
              </section>

              {/* Personalized Recommendations */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.personalized_recommendations')}</h2>
                <p className="mb-4 text-white">
                  {t('advanced_features.personalized_recommendations_desc')}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  <li>{t('advanced_features.recommendation_1')}</li>
                  <li>{t('advanced_features.recommendation_2')}</li>
                  <li>{t('advanced_features.recommendation_3')}</li>
                </ul>
              </section>

              {/* Sentiment Analysis */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.sentiment_analysis')}</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-700 flex justify-between items-center bg-gray-800">
                    <span className="text-white">{t('advanced_features.bitcoin')} (BTC)</span>
                    <span className="font-semibold text-green-500">{t('advanced_features.bullish')}</span>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-700 flex justify-between items-center bg-gray-800">
                    <span className="text-white">{t('advanced_features.ethereum')} (ETH)</span>
                    <span className="font-semibold text-red-500">{t('advanced_features.bearish')}</span>
                  </div>
                </div>
              </section>

              {/* Interactive Charts */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.interactive_charts')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-700 rounded p-4 bg-gray-800">
                    <p className="mb-2 text-center font-semibold text-white">{t('advanced_features.bitcoin_price_trend')}</p>
                    {bitcoinChartData ? (
                      <Line data={bitcoinChartData} options={lineChartOptions} />
                    ) : (
                      <p className="text-center text-white">{t('advanced_features.loading_bitcoin_data')}</p>
                    )}
                  </div>
                  <div className="border border-gray-700 rounded p-4 bg-gray-800">
                    <p className="mb-2 text-center font-semibold text-white">{t('advanced_features.ethereum_trading_volume')}</p>
                    {ethereumChartData ? (
                      <Bar data={ethereumChartData} options={barChartOptions} />
                    ) : (
                      <p className="text-center text-white">{t('advanced_features.loading_ethereum_data')}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Additional Chart: Market Cap Distribution */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.market_cap_distribution')}</h2>
                <div className="border border-gray-700 rounded p-4 bg-gray-800">
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
              </section>

              {/* Powerful Insights */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.powerful_insights')}</h2>
                <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <p className="text-lg">
                    {t('advanced_features.powerful_insights_desc')}
                  </p>
                </div>
              </section>

              {/* Integration Capabilities */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.integration_capabilities')}</h2>
                <p className="mb-4 text-white">
                  {t('advanced_features.integration_capabilities_desc')}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  <li>{t('advanced_features.integration_api')}</li>
                  <li>{t('advanced_features.integration_crm')}</li>
                  <li>{t('advanced_features.integration_social')}</li>
                </ul>
              </section>

              {/* Technical Specifications & Requirements */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.technical_specifications')}</h2>
                <div className="p-4 border border-gray-700 rounded bg-gray-800">
                  <ul className="list-disc pl-5 space-y-2 text-white">
                    <li>{t('advanced_features.spec_responsive_design')}</li>
                    <li>{t('advanced_features.spec_rest_api')}</li>
                    <li>{t('advanced_features.spec_real_time')}</li>
                    <li>{t('advanced_features.spec_secure_auth')}</li>
                  </ul>
                </div>
              </section>

              {/* Use Cases & Success Stories */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.use_cases')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-700 rounded shadow-sm bg-gray-800">
                    <h3 className="font-bold text-white">{t('advanced_features.case_study_fintech')}</h3>
                    <p className="text-white">
                      {t('advanced_features.case_study_fintech_desc')}
                    </p>
                  </div>
                  <div className="p-4 border border-gray-700 rounded shadow-sm bg-gray-800">
                    <h3 className="font-bold text-white">{t('advanced_features.success_story_investment')}</h3>
                    <p className="text-white">
                      {t('advanced_features.success_story_investment_desc')}
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ / Troubleshooting */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.faq')}</h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border border-gray-700 rounded">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left px-4 py-2 bg-gray-800 text-white focus:outline-none"
                      >
                        <span className="font-semibold">{faq.question}</span>
                      </button>
                      {openFAQ === index && (
                        <div className="px-4 py-2 bg-gray-800 text-white">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Call-to-Action / Contact Info */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('advanced_features.get_in_touch')}</h2>
                <p className="mb-4 text-white">
                  {t('advanced_features.get_in_touch_desc')}
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {t('advanced_features.contact_support')}
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-2 md:mt-0">
                    {t('advanced_features.schedule_demo')}
                  </button>
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdvancedFeaturesPage;
