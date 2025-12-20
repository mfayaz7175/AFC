import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/welcome/Navbar";
import LoginModal from "@/Components/welcome/LoginModel";
import RegisterModal from "@/Components/welcome/RegisterModel"; // Import the RegisterModal
import { HiLocationMarker } from 'react-icons/hi';

export default function App({news}) {

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const factRef = useRef(null);
  const teamRef = useRef(null);
  const reviewRef = useRef(null);
  const newsletterRef = useRef(null);
  const blogsRef = useRef(null);
  const footerRef = useRef(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for Login modal visibility
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // State for Register modal visibility
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null); // New state for redirection

  const handleScroll = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Updated: openLoginModal now accepts an optional redirect URL
  const openLoginModal = (redirectUrl = null) => {
    setRedirectAfterLogin(redirectUrl);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sections = ["home", "about", "features", "vision", "roadmap", "tokenomics", "team", "partners", "ecosystem", "faq", "community", "whitepaper", "news", "contact"];

  // Scroll tracking for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);



  // Marquee text component
  const MarqueeText = ({ text }) => {
    return (
      <div className="marquee-container whitespace-nowrap overflow-hidden">
        <div className="marquee-content flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-4 text-lg">
              {text} •
            </span>
          ))}
        </div>
      </div>
    );
  };



  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Z3JpZCBmaWxsPSJub25lIiBzdHJva2U9IiMxNDE0MTQiIHN0cm9rZS13aWR0aD0iMSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxNDE0MTQiLz48L2dyaWQ+PC9zdmc+')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
       <Navbar
        handleScroll={handleScroll}
        sections={{
          heroRef,
          aboutRef,
          featuresRef,
          processRef,
          factRef,
          teamRef,
          reviewRef,
          newsletterRef,
          blogsRef,
          footerRef,
        }}
        openLoginModal={openLoginModal} // Pass the updated openLoginModal function to Navbar
        openRegisterModal={openRegisterModal} // Pass the openRegisterModal function to Navbar
      />

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          openRegisterModal={openRegisterModal}
          redirectAfterLogin={redirectAfterLogin}  // Pass the redirect URL to the modal
        />
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
      )}

      {/* Main Content Area */}
      <main className={`transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-text">AfCoin</span> (AFC)
                  <span className="block text-xl md:text-2xl mt-2 text-gray-300 font-light">The Future of Afghan Finance</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                  Empowering Afghanistan's digital economy through blockchain innovation. Fast, secure, and designed for the future.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-0.5">
                    Get Started
                  </button>
                  <button className="px-6 py-3 border border-purple-600 rounded-full font-semibold hover:bg-purple-900/30 transition-colors">
                    Whitepaper
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2025</div>
                    <div className="text-sm text-gray-400">Launch Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">+1000</div>
                    <div className="text-sm text-gray-400">Community Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">100M</div>
                    <div className="text-sm text-gray-400">Total Supply</div>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="w-full h-64 md:h-80 lg:h-96 mx-auto relative">
                  {/* Blockchain Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-purple-500 animate-pulse"
                        style={{
                          animationDelay: `${i * 200}ms`,
                          top: `${20 + i * 15}%`,
                          left: `${50 + Math.sin(i) * 20}%`,
                          opacity: 1 - i * 0.2
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* AFC Token */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="floating-logo w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-purple-700 via-purple-900 to-black flex items-center justify-center shadow-2xl shadow-purple-500/20">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl font-bold text-white">AFC</span>
                      </div>
                    </div>
                  </div>

                  {/* Afghan Flag Elements */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1">
                    <div className="w-12 h-4 bg-black rounded-t"></div>
                    <div className="w-12 h-4 bg-red-700"></div>
                    <div className="w-12 h-4 bg-green-700 rounded-b"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </section>

        {/* Moving Text Marquee */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 py-2 overflow-hidden">
          <MarqueeText text="AfCoin is Afghanistan's first native cryptocurrency empowering financial inclusion through blockchain technology" />
        </div>

        {/* About Section */}
        <section id="about" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/afghanistan/1920/1080')] bg-cover bg-center opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Empowering Afghanistan Through Blockchain</h2>
              <p className="text-xl text-gray-300 mb-6">
                AfCoin (AFC) is Afghanistan's first native cryptocurrency, designed to revolutionize financial access in a nation where traditional banking infrastructure faces challenges.
              </p>
              <p className="text-gray-400">
                Built on a sustainable proof-of-stake blockchain, AFC provides fast, secure transactions while empowering Afghan developers, entrepreneurs, and citizens with decentralized financial tools.
              </p>
            </div>

            {/* Afghan Cultural Elements */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">🪙</div>
                <h3 className="text-xl font-semibold mb-2">Local Currency Integration</h3>
                <p className="text-gray-400">Seamless conversion between AFC and Afghan Afghani (AFN) through local exchange partners.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">🏔️</div>
                <h3 className="text-xl font-semibold mb-2">Mountain-Secure Network</h3>
                <p className="text-gray-400">Named after Afghanistan's majestic Hindu Kush mountains, our network offers rock-solid security and reliability.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Education & Adoption</h3>
                <p className="text-gray-400">We're partnering with Afghan universities and tech hubs to educate the next generation of blockchain developers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose AfCoin?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "⚡", title: "Lightning Fast Transactions", desc: "Sub-second block times for instant transfers across Afghanistan and beyond." },
                { icon: "🌱", title: "Eco-Friendly Consensus", desc: "Energy-efficient proof-of-stake algorithm with near-zero carbon footprint." },
                { icon: "🔒", title: "Military-Grade Security", desc: "Advanced cryptographic protocols developed with Afghan cybersecurity experts." },
                { icon: "🌐", title: "Local Language Support", desc: "Full Pashto and Dari language integration for wider accessibility." },
                { icon: "🤝", title: "Community Governance", desc: "Every AFC holder has a voice in shaping our nation's digital financial future." },
                { icon: "📡", title: "Low-Bandwidth Optimization", desc: "Designed to function efficiently in areas with limited internet connectivity." }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-600 transition-all duration-300 group transform hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6">Our Vision for Afghanistan</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    In a country where over 70% of the population lacks access to traditional banking services, AfCoin represents a new paradigm of financial inclusion.
                  </p>
                  <p className="text-gray-300">
                    We envision a future where Afghan entrepreneurs can easily access global markets, remittances flow instantly and cheaply, and financial sovereignty is restored to the people.
                  </p>
                  <p className="text-gray-300">
                    Our roadmap includes partnerships with local telecom providers to enable mobile-based transactions, and collaboration with Afghan universities to build the next generation of blockchain talent.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                  <div className="relative h-64 md:h-80">
                    <img
                      src="https://picsum.photos/seed/kabul/600/400"
                      alt="Kabul cityscape"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4">
                        <h3 className="font-bold text-lg">Kabul, Afghanistan</h3>
                        <p className="text-sm text-gray-300">Our journey begins here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600"></div>

              <div className="space-y-16">
                {[
                  { year: "2023", phase: "Phase 1", desc: "Foundation laying with local tech communities and regulatory consultations." },
                  { year: "2024 Q1", phase: "Phase 2", desc: "Testnet launch and pilot programs with Afghan fintech startups." },
                  { year: "2024 Q3", phase: "Phase 3", desc: "Mainnet launch with mobile wallet app available in Pashto and Dari." },
                  { year: "2025", phase: "Phase 4", desc: "Integration with Afghan telecom networks for SMS-based transactions." }
                ].map((step, i) => (
                  <div key={i} className="relative flex justify-between items-center">
                    <div className="w-5/12 text-right pr-4">
                      <div className="bg-purple-900/30 p-4 rounded-lg inline-block backdrop-blur-sm border border-purple-800">
                        <h4 className="font-bold text-lg">{step.phase}</h4>
                        <p className="text-sm text-gray-400">{step.year}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-purple-500 rounded-full z-10"></div>
                    <div className="w-5/12 pl-4">
                      <div className="bg-gray-900/70 p-4 rounded-lg inline-block backdrop-blur-sm border border-gray-700">
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Token Distribution</h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-80 mb-12">
                {/* Simple SVG Pie Chart */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="80" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="80" strokeDasharray="251.2" strokeDashoffset="50" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">100M</div>
                    <div className="text-sm text-gray-400">Total Supply</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { name: "Public Sale", value: "30%", color: "bg-purple-600" },
                  { name: "Staking Rewards", value: "35%", color: "bg-pink-600" },
                  { name: "Team", value: "15%", color: "bg-green-600" },
                  { name: "Ecosystem Fund", value: "20%", color: "bg-blue-600" }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}></div>
                    <h4 className="font-semibold">{item.value}</h4>
                    <p className="text-gray-400 text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Mahdi Senator", role: "Developer", location: "Kabul" },
                { name: "Mohammad Fayaz", role: "Developer", location: "Kabul" },
                { name: "Mohammad Fayaz", role: "Founder", location: "Ghazni" },
                { name: "Mahdi Senator", role: "Founder", location: "Bamyan" },
              ].map((member, i) => (
                <div key={i} className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-purple-900 to-gray-900 relative">
                    <img
                      src={`/img/member/${i + 1}.jpg`}
                      alt={member.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    <div className=" absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="font-bold pl-5">{member.role}</p>
                    </div>

                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <HiLocationMarker className="w-5 h-5" />
                      <span className="ml-1">{member.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Moving Text Marquee */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 py-2 overflow-hidden">
          <MarqueeText text="AfCoin is committed to building a decentralized financial future for Afghanistan's 40 million people" />
        </div>

        {/* Partners Section */}
        <section id="partners" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Partners</h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-32 h-16 bg-gray-800/50 backdrop-blur-sm rounded flex items-center justify-center border border-gray-700 hover:border-purple-600 transition-colors transform hover:scale-105">
                  <span className="text-gray-600">Logo {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Ecosystem</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Mobile Wallet", icon: "📱" },
                { name: "Exchange", icon: "💱" },
                { name: "Staking Platform", icon: "🔒" },
                { name: "DApp Store", icon: "📦" },
                { name: "Remittance Service", icon: "💸" },
                { name: "Merchant Portal", icon: "🏪" },
                { name: "Developer Hub", icon: "💻" },
                { name: "Community Forum", icon: "💬" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors transform hover:-translate-y-1 duration-300">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "How do I buy AFC tokens?", a: "You can participate in our public sale or purchase AFC on partner exchanges once listed." },
                { q: "Is AFC compliant with Afghan regulations?", a: "We're working closely with local authorities to ensure full compliance with financial regulations." },
                { q: "How can I participate in governance?", a: "Stake your AFC tokens to vote on important protocol decisions and proposals." },
                { q: "What makes AFC different from other cryptocurrencies?", a: "AFC is specifically designed to address Afghanistan's unique financial challenges and opportunities." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">Connect with fellow Afghans and crypto enthusiasts shaping the future of finance in Afghanistan.</p>

            <div className="flex justify-center gap-4 flex-wrap">
              {["Telegram", "Twitter", "Discord", "Reddit", "Facebook", "Instagram"].map((social, i) => (
                <button key={i} className="px-4 py-2 bg-gray-800/70 backdrop-blur-sm rounded-full hover:bg-purple-900/30 transition-colors border border-gray-700 hover:border-purple-600 transform hover:scale-105">
                  {social}
                </button>
              ))}
            </div>

            <div className="mt-12">
              <div className="text-2xl mb-4">Live Community Count</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">+1,234</div>
            </div>
          </div>
        </section>

        {/* Whitepaper Section */}
        <section id="whitepaper" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Download Our Whitepaper</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore the technical details, economic model, and vision that powers AfCoin's blockchain ecosystem for Afghanistan.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-0.5">
              Download PDF (1.2MB)
            </button>

            <div className="mt-12 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-24 h-32 bg-gray-700 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg mb-1">Technical Whitepaper v1.2</h3>
                  <p className="text-sm text-gray-400">Last updated: March 2024</p>
                  <p className="mt-2 text-sm">Includes detailed specifications on consensus mechanism, tokenomics, and roadmap.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
       <section id="news" className="py-20 bg-gray-900/50 relative overflow-hidden">
               <div className="container mx-auto px-4">
  <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
    Latest News
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {news.map((item) => (
      <div
        key={item.id}
        className="group bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      >
        {/* Image with gradient overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image ? `/storage/${item.image}` : '/img/no-image.png'}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

          {/* Category badge */}
          {item.category && (
            <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {item.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center text-xs text-gray-400 mb-2 space-x-2">
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{item.read_time || '2 min read'}</span>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {item.title}
          </h3>

          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {item.description}
          </p>

          <div className="flex justify-between items-center">
            {/* Author info */}
            {item.author && (
              <div className="flex items-center space-x-2">
                {item.author_avatar && (
                  <img
                    src={`/storage/${item.author_avatar}`}
                    alt={item.author}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-xs text-gray-400">{item.author}</span>
              </div>
            )}

            {/* Read more link */}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            </section>


        {/* Contact Section */}
        <section id="contact" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Contact Us</h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg h-full">
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <p className="text-gray-400 mb-6">Have questions about AfCoin or want to partner with us? Reach out through any of the channels below.</p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="ml-3">info@afcoin.af</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="ml-3">+93 700 000 000</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="ml-3">Kabul, Afghanistan</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded" />
                  <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded" />
                  <textarea placeholder="Your Message" rows="5" className="w-full p-3 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded"></textarea>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded font-semibold hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="bg-black/80 py-12 border-t border-gray-800 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-sm font-bold">AFC</span>
                  </div>
                  <span className="text-sm text-gray-300 uppercase tracking-wider">AfCoin</span>
                </div>
                <p className="text-gray-400 mb-4">Empowering Afghanistan's digital economy through blockchain innovation.</p>
                <div className="flex space-x-4">
                  {["Twitter", "Telegram", "Discord"].map((social, i) => (
                    <a key={i} href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {social === "Twitter" && "🐦"}
                      {social === "Telegram" && "✈️"}
                      {social === "Discord" && "💬"}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#whitepaper" className="hover:text-purple-400">Whitepaper</a></li>
                  <li><a href="#roadmap" className="hover:text-purple-400">Roadmap</a></li>
                  <li><a href="#tokenomics" className="hover:text-purple-400">Tokenomics</a></li>
                  <li><a href="#faq" className="hover:text-purple-400">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Ecosystem</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-purple-400">Wallet</a></li>
                  <li><a href="#" className="hover:text-purple-400">Explorer</a></li>
                  <li><a href="#" className="hover:text-purple-400">DApp Store</a></li>
                  <li><a href="#" className="hover:text-purple-400">Staking</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-purple-400">AML Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} AfCoin (AFC). All rights reserved.</p>
              <p className="mt-2 text-sm">Built in Afghanistan for the world</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll to Top Button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-4 bottom-4 p-3 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }

  @keyframes floating {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }

  @keyframes text-animate {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-blob {
    animation: blob 7s infinite ease-in-out both;
  }

  .animation-delay-2000 {
    animation-delay: 2000ms;
  }

  .animation-delay-4000 {
    animation-delay: 4000ms;
  }

  .floating-logo {
    animation: floating 3s ease-in-out infinite;
  }

  .marquee-container {
    white-space: nowrap;
    overflow: hidden;
    position: relative;
  }

  .marquee-content {
    position: absolute;
    animation: marquee 30s linear infinite;
  }

  .animate-text {
    background: linear-gradient(270deg, #8B5CF6, #EC4899, #8B5CF6);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: text-animate 5s ease infinite;
  }

  .bg-grid-pattern {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Z3JpZCBmaWxsPSJub25lIiBzdHJva2U9IiMxNDE0MTQiIHN0cm9rZS13aWR0aD0iMSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxNDE0MTQiLz48L2dyaWQ+PC9zdmc+');
  }
`;
document.head.appendChild(style);
