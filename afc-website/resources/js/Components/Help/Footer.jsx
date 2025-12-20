import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} AFC. {t('help.footer.all_rights_reserved')}</p>
        <p className="mt-2">
          <Link href={route('privacyPolicy')} className="hover:underline">
            {t('help.footer.privacy_policy')}
          </Link>{' '}
          |{' '}
          <Link href="/terms" className="hover:underline">
            {t('help.footer.terms_of_service')}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
