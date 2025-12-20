// resources/js/I18nUpdater.jsx
import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import i18n from './i18n';

const I18nUpdater = () => {
  const { locale } = usePage().props;

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      console.log("i18n language updated to:", locale);
    });
  }, [locale]);

  return null; // This component doesn't need to render any markup.
};

export default I18nUpdater;
