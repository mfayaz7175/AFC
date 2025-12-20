import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-100">
          {t('help.hero_section.welcome')}
        </h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto text-gray-100">
          {t('help.hero_section.description')}
        </p>
        <button 
          onClick={() =>
            document.getElementById('tab-section').scrollIntoView({ behavior: 'smooth' })
          }
          className="flex items-center justify-center bg-gradient-to-r from-blue-800 to-teal-400 hover:from-teal-400 hover:to-blue-800 transition duration-300 px-8 py-3 rounded-lg font-semibold shadow-md text-white"
        >
          {t('help.hero_section.button_text')} <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
