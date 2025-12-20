// HelpPage.jsx
import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';


import Header from '@/Components/Help/Header';
import HeroSection from '@/Components/Help/HeroSection';
import Tabs from '@/Components/Help/Tabs';
import FAQSection from '@/Components/Help/FAQSection';
import TutorialsSection from '@/Components/Help/TutorialsSection';
import TroubleshootingSection from '@/Components/Help/TroubleshootingSection';
import ContactSection from '@/Components/Help/ContactSection';
import Footer from '@/Components/News/Footer';
import GlobalAdPopup from '@/Components/GlobalAdPopup';

const HelpPage = ({ helpEntries = [], tutorials, isAdmin, auth }) => {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('FAQ');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Separate help entries into FAQ and Troubleshooting
  const faqEntries = helpEntries.filter(entry => entry.entry_type === 'faq');
  const troubleshootingEntries = helpEntries.filter(entry => entry.entry_type === 'troubleshooting');

  return (
    <AuthenticatedLayout auth={auth}>
      <div className={`${theme === 'light' ? 'bg-white/0' : 'bg-gray-800/0'} backdrop-blur-sm min-h-screen transition-colors my-4`}>
        <Header toggleTheme={toggleTheme} theme={theme} onTabSwitch={setActiveTab} />
        <HeroSection />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SwitchTransition mode="out-in">
          <CSSTransition key={activeTab} timeout={300} classNames="slide" unmountOnExit>
            <div>
              {activeTab === 'FAQ' && (
                <FAQSection entries={faqEntries} isAdmin={isAdmin} userEmail={auth.user.email} />
              )}
              {activeTab === 'Troubleshooting' && (
                <TroubleshootingSection entries={troubleshootingEntries} isAdmin={isAdmin} userEmail={auth.user.email} />
              )}
              {activeTab === 'Tutorials' && <TutorialsSection tutorials={tutorials} isAdmin={isAdmin} />}
              {activeTab === 'Contact Support' && <ContactSection />}
              <GlobalAdPopup/>
            </div>

          </CSSTransition>
        </SwitchTransition>
        <Footer />
      </div>
    </AuthenticatedLayout>
  );
};

export default HelpPage;
