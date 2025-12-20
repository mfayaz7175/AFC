import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import './style/Setting.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformation from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import Header from '@/Pages/Dashboard/BlurHeader';
import Footer from '@/Components/News/Footer';
import AdminRegister from '@/Pages/Auth/AdminRegister';
// import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
 
const SettingsPage = () => {
  const { locale, auth } = usePage().props;

  useEffect(() => {
    console.log("Current locale in Inertia:", locale);
    console.log("Current i18n language:", i18n.language);
  }, [locale]);

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  const isAdmin = () => true; // Adjust based on your actual admin logic

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen">
        <Container className="settings-page my-5">
          <Header title={t('settings.header')} />
          {/* Language switcher placed at the top right */}
          <div className="d-flex justify-content-end my-3">
            {/* <LanguageSwitcher /> */}
          </div>
          {/* Main Card with Dark Mode Styling */}
          <Card className="shadow-xl rounded-2xl bg-gray-800 border border-gray-700">
            {/* Card Header */}
            <Card.Header className="bg-gray-700 border-b border-gray-600 py-4 px-6">
              <h5 className="text-xl text-dark font-semibold text-gray-100 m-0">
                {activeTab === 'profile' && t('settings.profile_settings')}
                {activeTab === 'security' && t('settings.security_settings')}
                {activeTab === 'notifications' && t('settings.notification_settings')}
                {activeTab === 'account' && t('settings.account_management')}
                {activeTab === 'admin' && t('settings.admin_dashboard')}
                {activeTab === 'register' && t('settings.admin_register')}
              </h5>
            </Card.Header>

            {/* Card Body */}
            <Card.Body className="p-6 bg-gray-800">
              <Row>
                {/* Sidebar Navigation */}
                <Col md={3}>
                  <Card className="settings-tabs-card bg-gray-700/30 border border-gray-600 rounded-xl backdrop-blur-sm">
                    <Card.Body className="p-4">
                      <Nav variant="pills" className="flex-column settings-tabs-nav gap-2">
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setActiveTab('profile')}
                            active={activeTab === 'profile'}
                            className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-blue-600/30 data-[active=true]:text-blue-400"
                          >
                            <i className="fa-solid fa-user mr-2 text-blue-900" aria-hidden="true"></i>
                            {t('settings.profile_settings')}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setActiveTab('security')}
                            active={activeTab === 'security'}
                            className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-green-600/30 data-[active=true]:text-green-400"
                          >
                            <i className="fa-solid fa-lock mr-2 text-green-400" aria-hidden="true"></i>
                            {t('settings.security_settings')}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setActiveTab('notifications')}
                            active={activeTab === 'notifications'}
                            className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-yellow-600/30 data-[active=true]:text-yellow-400"
                          >
                            <i className="fa-solid fa-bell mr-2 text-yellow-400" aria-hidden="true"></i>
                            {t('settings.notification_settings')}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setActiveTab('account')}
                            active={activeTab === 'account'}
                            className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-red-600/30 data-[active=true]:text-red-400"
                          >
                            <i className="fa-solid fa-user-cog mr-2 text-red-400" aria-hidden="true"></i>
                            {t('settings.account_management')}
                          </Nav.Link>
                        </Nav.Item>
                        {auth.can['viewAdminPanel'] && (
                          <Nav.Item>
                            <Nav.Link
                              onClick={() => setActiveTab('admin')}
                              active={activeTab === 'admin'}
                              disabled={!isAdmin()}
                              className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-purple-600/30 data-[active=true]:text-purple-400"
                            >
                              <i className="fa-solid fa-toolbox mr-2 text-purple-400" aria-hidden="true"></i>
                              {t('settings.admin_dashboard')}
                            </Nav.Link>
                          </Nav.Item>
                        )}
                        {auth.can['viewAdminPanel'] && (
                          <Nav.Item>
                            <Nav.Link
                              onClick={() => setActiveTab('register')}
                              active={activeTab === 'register'}
                              disabled={!isAdmin()}
                              className="py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors font-medium data-[active=true]:bg-indigo-600/30 data-[active=true]:text-indigo-400"
                            >
                              <i className="fa-solid fa-toolbox mr-2 text-indigo-400" aria-hidden="true"></i>
                              {t('settings.admin_register')}
                            </Nav.Link>
                          </Nav.Item>
                        )}
                      </Nav>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Settings Content */}
                <Col md={9}>
                  <div className="settings-content p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    {activeTab === 'profile' && (
                      <>
                        <h6 className="text-lg font-semibold text-blue-400 mb-4">
                          {t('settings.profile_settings')}
                        </h6>
                        <UpdateProfileInformation />
                      </>
                    )}
                    {activeTab === 'security' && (
                      <>
                        <h6 className="text-lg font-semibold text-green-400 mb-4">
                          {t('settings.security_settings')}
                        </h6>
                        <UpdatePasswordForm />
                      </>
                    )}
                    {activeTab === 'notifications' && (
                      <>
                        <h6 className="text-lg font-semibold text-yellow-400 mb-4">
                          {t('settings.notification_settings')}
                        </h6>
                        <Form>
                          <Form.Check
                            type="switch"
                            id="email-notifications"
                            label={t('settings.email_notifications')}
                            defaultChecked
                            className="mb-3 text-gray-300"
                          />
                          <Form.Check
                            type="switch"
                            id="sms-notifications"
                            label={t('settings.sms_notifications')}
                            className="mb-3 text-gray-300"
                          />
                          <Form.Check
                            type="switch"
                            id="push-notifications"
                            label={t('settings.push_notifications')}
                            defaultChecked
                            className="mb-3 text-gray-300"
                          />
                          <Button
                            variant="primary"
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {t('settings.save_preferences')}
                          </Button>
                        </Form>
                      </>
                    )}
                    {activeTab === 'account' && (
                      <>
                        <h6 className="text-lg font-semibold text-red-400 mb-4">
                          {t('settings.account_management')}
                        </h6>
                        <DeleteUserForm />
                      </>
                    )}
                    {activeTab === 'admin' && auth.can['viewAdminPanel'] && (
                      <>
                        <h6 className="text-lg font-semibold text-purple-400 mb-4">
                          {t('settings.admin_dashboard')}
                        </h6>
                        <Row>
                          <Col md={6}>
                            <Button
                              variant="primary"
                              className="admin-button w-100 mb-3 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <i className="fa-solid fa-users mr-2" aria-hidden="true"></i>
                              {t('settings.manage_users')}
                            </Button>
                          </Col>
                          <Col md={6}>
                            <Button
                              variant="warning"
                              className="admin-button w-100 mb-3 bg-yellow-600 hover:bg-yellow-700 text-white"
                            >
                              <i className="fa-solid fa-chart-line mr-2" aria-hidden="true"></i>
                              {t('settings.view_analytics')}
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Button
                              variant="success"
                              className="admin-button w-100 mb-3 bg-green-600 hover:bg-green-700 text-white"
                            >
                              <i className="fa-solid fa-cogs mr-2" aria-hidden="true"></i>
                              {t('settings.system_settings')}
                            </Button>
                          </Col>
                          <Col md={6}>
                            <Button
                              variant="danger"
                              className="admin-button w-100 bg-red-600 hover:bg-red-700 text-white"
                            >
                              <i className="fa-solid fa-exclamation-triangle mr-2" aria-hidden="true"></i>
                              {t('settings.error_logs')}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                    {activeTab === 'register' && auth.can['viewAdminPanel'] && (
                      <>
                        <h6 className="text-lg font-semibold text-indigo-400 mb-4">
                          {t('settings.admin_register')}
                        </h6>
                        <AdminRegister />
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Footer />
        </Container>
      </div>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
