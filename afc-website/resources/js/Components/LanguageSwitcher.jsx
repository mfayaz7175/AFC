import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';

const localeNames = {
  en: 'English',
  fa: 'فارسی',
  ps: 'پښتو',
};

export default function LanguageSwitcher() {
  const { locale, availableLocales } = usePage().props;

  function changeLanguage(lang) {
    if (lang !== locale) {
      Inertia.post('/locale', { locale: lang });
    }
  }

  return (
    <ButtonGroup aria-label="Language switcher" className="shadow-lg">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="locale-tooltip"><FaGlobe className="me-1"/> Change Language</Tooltip>}
      >
        <Button variant="outline-light" disabled className="d-flex align-items-center">
          <FaGlobe />
        </Button>
      </OverlayTrigger>

      {availableLocales.map((lang) => (
        <OverlayTrigger
          key={lang}
          placement="bottom"
          overlay={<Tooltip id={`tooltip-${lang}`}>{localeNames[lang] || lang.toUpperCase()}</Tooltip>}
        >
          <Button
            variant={locale === lang ? 'light' : 'outline-light'}
            onClick={() => changeLanguage(lang)}
            className="text-uppercase px-3"
            active={locale === lang}
          >
            {lang}
          </Button>
        </OverlayTrigger>
      ))}
    </ButtonGroup>
  );
}
