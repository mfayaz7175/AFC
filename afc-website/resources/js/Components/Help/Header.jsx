import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./style/Help.css";

const Header = ({ toggleTheme, theme, onTabSwitch }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navigation link click: switch tab and scroll to the section.
  const handleLinkClick = (e, tabName) => {
    e.preventDefault();
    onTabSwitch(tabName);
    const tabSection = document.getElementById("tab-section");
    if (tabSection) {
      tabSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-400 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        {/* Logo and Site Title */}
        <div className="flex items-center">
          <img src="img/coins/coin.png" alt="CryptoProject Logo" className="h-12 w-12 mr-3" />
          <span className="text-3xl font-extrabold tracking-wide">AfCoin</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="text-dark no-underline text-lg" onClick={(e) => handleLinkClick(e, 'FAQ')}>
                {t('help.header.help_center')}
              </a>
            </li>
            <li>
              <a href="#" className="text-dark no-underline text-lg" onClick={(e) => handleLinkClick(e, 'Tutorials')}>
                {t('help.header.tutorials')}
              </a>
            </li>
            <li>
              <a href="#" className="text-dark no-underline text-lg" onClick={(e) => handleLinkClick(e, 'Troubleshooting')}>
                {t('help.header.troubleshooting')}
              </a>
            </li>
            <li>
              <a href="#" className="text-dark no-underline text-lg" onClick={(e) => handleLinkClick(e, 'Contact Support')}>
                {t('help.header.contact_support')}
              </a>
            </li>
          </ul>
        </nav>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-900 to-teal-400">
          <ul className="flex flex-col space-y-2 py-2 px-6">
            <li>
              <a href="#" className="block no-underline hover:text-yellow-400 text-lg" onClick={(e) => handleLinkClick(e, 'FAQ')}>
                {t('help.header.help_center')}
              </a>
            </li>
            <li>
              <a href="#" className="block no-underline hover:text-yellow-400 text-lg" onClick={(e) => handleLinkClick(e, 'Tutorials')}>
                {t('help.header.tutorials')}
              </a>
            </li>
            <li>
              <a href="#" className="block no-underline hover:text-yellow-400 text-lg" onClick={(e) => handleLinkClick(e, 'Troubleshooting')}>
                {t('help.header.community_forum')}
              </a>
            </li>
            <li>
              <a href="#" className="block no-underline hover:text-yellow-400 text-lg" onClick={(e) => handleLinkClick(e, 'Contact Support')}>
                {t('help.header.contact_support')}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
