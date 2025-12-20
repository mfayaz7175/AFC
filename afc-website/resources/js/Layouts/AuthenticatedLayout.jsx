import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import './AuthenticatedLayout.css';
import { Modal, Button } from 'react-bootstrap';
import { router } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { LoadingAnimation, LogoutAnimation } from "../Components/animations/Loading";
import UserEmailsModal from '@/Pages/Dashboard/UserEmailsModal';
import I18nUpdater from '@/I18nUpdater';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import GlobalAdPopup from '@/Components/GlobalAdPopup';

const Header = ({ onToggleSidebar, onLogout, onMessageClick }) => {
  const { t } = useTranslation();
  const { auth, unreadSupportCount: initialUnreadCount, m } = usePage().props;
  const user = auth.user;

  // ── Search state ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.length > 0) {
      try {
        const res = await axios.get(`/search?q=${encodeURIComponent(val)}`);
        // expecting [{ name, uri }, ...]
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelect = (uri) => {
    router.visit(`/${uri}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Unread support count polling ──────────────────────────────────────────────
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount || 0);
  useEffect(() => {
    const fetchUnreadCount = () => {
      fetch(route('help.emails.unreadCount'), {
        headers: { 'Accept': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => setUnreadCount(data.unreadSupportCount))
        .catch((err) => console.error(err));
    };
    window.addEventListener('unreadCountUpdated', fetchUnreadCount);
    return () => window.removeEventListener('unreadCountUpdated', fetchUnreadCount);
  }, []);

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    Inertia.post(route('logout'));
  };

  const handleNotification = () => {
    router.visit(route('notify.index'), {
      onFinish: () => router.reload(),
    });
  };

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label={t('layout.toggle_sidebar')}>
          &#9776;
        </button>
        <LanguageSwitcher />
      </div>

      <div className="header-actions flex items-center relative">
        {/* Desktop Search */}
        <div className="hidden sm:block relative" ref={dropdownRef}>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('layout.search_placeholder')}
            className="text-black w-full xl:w-[30rem] lg:w-[25rem] md:w-[10rem] py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition"
          />
          {searchResults.length > 0 && (
            <ul className="absolute z-10 bg-gray-700 shadow-lg rounded mt-1 w-full max-h-60 overflow-auto">
              {searchResults.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(item.uri)}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-black"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Search Toggle */}
        <div className="block sm:hidden">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 focus:outline-none"
            aria-label={t('layout.toggle_search')}
          >
            <i className="fa fa-search text-gray-600"></i>
          </button>
          {showMobileSearch && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-2 mt-1 z-50" ref={dropdownRef}>
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('layout.search_placeholder')}
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition"
              />
              {searchResults.length > 0 && (
                <ul className="mt-1 max-h-60 overflow-auto">
                  {searchResults.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => handleSelect(item.uri)}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Notifications & Profile */}
        <div className="header-notifications ml-4">
          <div className="notification inline-block mr-2 mt-2" onClick={handleNotification}>
            <span className="notification-icon">&#128276;</span>
            <span className="notification-badge">{m || '0'}</span>
          </div>
          {auth.can['viewAdminPanel'] && (
            <div className="message inline-block mt-4" onClick={onMessageClick} style={{ cursor: 'pointer' }}>
              <span className="message-icon">&#9993;</span>
              {unreadCount > 0 && <span className="message-badge">{unreadCount}</span>}
            </div>
          )}
        </div>

        <div className="user-profile ml-4">
          <div className="ms-3 relative">
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition ease-in-out duration-150 flex items-center"
                  >
                    {user.name}
                    <i className="fa fa-caret-down ml-2"></i>
                  </button>
                </span>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <div className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-md shadow-lg mt-2 py-2 w-48">
                  <Dropdown.Link
                    href={route('profile.edit')}
                    className="block px-4 py-2 text-sm text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700"
                  >
                    {t('layout.profile')}
                  </Dropdown.Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 text-red-300 hover:bg-gray-100 hover:bg-gray-700"
                  >
                    {t('layout.logout')}
                  </button>
                </div>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('layout.confirm_logout')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('layout.logout_confirmation')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            {t('layout.cancel')}
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            {t('layout.logout')}
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { auth } = usePage().props;

  return (
    <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
    <button className="close-sidebar" onClick={onClose} aria-label={t('layout.close_sidebar')}>
      &times;
    </button>
    <nav>
      <ul>
        <li>
          <NavLink href={route('dashboard')} active={route().current('dashboard')}>
            <i className="fas fa-home nav-icon" title={t('layout.dashboard')}></i>
            <span className="nav-text">{t('layout.dashboard')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('afc')} active={route().current('afc')}>
            <i className="fas fa-coins nav-icon" title={t('layout.afc')}></i>
            <span className="nav-text">{t('layout.afc')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('manageRef')} active={route().current('manageRef')}>
            <i className="fas fa-tasks nav-icon" title={t('layout.manage_ref')}></i>
            <span className="nav-text">{t('layout.manage_ref')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('news.index')} active={route().current('news.index')}>
            <i className="fas fa-newspaper nav-icon" title={t('layout.news')}></i>
            <span className="nav-text">{t('layout.news')}</span>
          </NavLink>
        </li>
        {auth.can['viewAdminPanel'] && (
        <li>
          <NavLink href={route('ad.index')} active={route().current('ad.index')}>
            <i className='fa-solid fa-ad nav-icon' title={t('layout.ad')}></i>
            <span className="nav-text">{t('layout.ad')}</span>
          </NavLink>
        </li>
        )}
        {auth.can['viewAdminPanel'] && (
        <li>
          <NavLink href={route('ad.showAd')} active={route().current('ad.showAd')}>
            <i className='fa-solid fa-eye nav-icon' title={t('layout.show_ad')}></i>
            <span className="nav-text">{t('layout.show_ad')}</span>
          </NavLink>
        </li>
        )}
        <li>
          <NavLink href={route('chat')} active={route().current('chat')}>
            <i className="fas fa-comments nav-icon" title={t('layout.chat')}></i>
            <span className="nav-text">{t('layout.chat')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('notify.index')} active={route().current('notify.index')}>
            <i className="fas fa-bell nav-icon" title={t('layout.notify')}></i>
            <span className="nav-text">{t('layout.notify')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('settings')} active={route().current('settings')}>
            <i className="fas fa-cog nav-icon" title={t('layout.settings')}></i>
            <span className="nav-text">{t('layout.settings')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('advance')} active={route().current('advance')}>
            <i className="fas fa-rocket nav-icon" title={t('layout.advanced_features')}></i>
            <span className="nav-text">{t('layout.advanced_features')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('help')} active={route().current('help')}>
            <i className="fas fa-question-circle nav-icon" title={t('layout.help')}></i>
            <span className="nav-text">{t('layout.help')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink href={route('privacyPolicy')} active={route().current('privacyPolicy')}>
            <i className="fas fa-question-circle nav-icon" title={t('layout.privacy_policy')}></i>
            <span className="nav-text">{t('layout.privacy_policy')}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
  );
};

const AuthenticatedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [showEmailsModal, setShowEmailsModal] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      if (window.__isDeleting) return;
      setIsPageLoading(true);
    };
    const handleFinish = () => setIsPageLoading(false);

    const removeStart = Inertia.on('start', handleStart);
    const removeFinish = Inertia.on('finish', handleFinish);
    return () => {
      removeStart();
      removeFinish();
    };
  }, []);

  const handleLogoutLoading = () => setIsLogoutLoading(true);

  return (
    <div className="dashboard-container">
      <div
        className="blurred-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/img/bg5.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
          zIndex: -1,
        }}
      />
      <I18nUpdater />
      {!isLogoutLoading && isPageLoading && <LoadingAnimation />}
      {isLogoutLoading && <LogoutAnimation />}
      <Header
        onToggleSidebar={() => setSidebarOpen(true)}
        onLogout={handleLogoutLoading}
        onMessageClick={() => setShowEmailsModal(true)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className="content-wrapper"
        style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
      >
        {children}
      </div>
      {/* <GlobalAdPopup /> */}
      <UserEmailsModal show={showEmailsModal} onHide={() => setShowEmailsModal(false)} />
    </div>
  );
};

export default AuthenticatedLayout;
