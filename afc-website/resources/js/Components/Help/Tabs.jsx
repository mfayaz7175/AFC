import React from 'react';
import { useTranslation } from 'react-i18next';

const Tabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  
  // Use an array of objects to preserve parent's activeTab values while translating labels.
  const tabs = [
    { value: 'FAQ', translationKey: 'faq' },
    { value: 'Tutorials', translationKey: 'tutorials' },
    { value: 'Troubleshooting', translationKey: 'troubleshooting' },
    { value: 'Contact Support', translationKey: 'contact_support' }
  ];
  
  return (
    <section id="tab-section" className="container mx-auto px-4">
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-3 -mb-px text-lg font-semibold transition-colors ${
                activeTab === tab.value
                  ? 'border-b-4 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {t(`help.tabs.${tab.translationKey}`)}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Tabs;
