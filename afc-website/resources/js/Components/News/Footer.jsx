import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="text-center mt-4 text-white py-3 border-top">
      <small>
        {t("news.footer.copyright")} {' '}
        <a href="#" className=" text-white text-decoration-none">
          {t("news.footer.about_us")}
        </a>{' '}
        |{' '}
        <a href="#" className=" text-white text-decoration-none">
          {t("news.footer.privacy_policy")}
        </a>{' '}
        |{' '}
        <a href="#" className=" text-white text-decoration-none">
          {t("news.footer.contact")}
        </a>
      </small>
    </footer>
  );
};

export default Footer;
