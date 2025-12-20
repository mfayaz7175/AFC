import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from '@/Components/News/Footer';
import { useTranslation } from 'react-i18next';

// Inline style objects for the dark crypto-inspired theme with Figtree font
const cardStyle = {
  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  border: 'none',
  color: '#ffffff',
  fontFamily: "'Futura', sans-serif",
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  borderBottom: '2px solid #0f3460',
  paddingBottom: '0.5rem',
  marginBottom: '1rem',
  fontFamily: "'Figtree', sans-serif",
};

const sectionHeaderStyle = {
  color: '#e94560',
  borderBottom: '1px solid #e94560',
  paddingBottom: '0.3rem',
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
  fontFamily: "'Figtree', sans-serif",
};

const paragraphStyle = {
  lineHeight: '1.6',
  marginBottom: '1rem',
  fontFamily: "'Figtree', sans-serif",
};

const listStyle = {
  marginLeft: '1.5rem',
  marginBottom: '1rem',
  fontFamily: "'Figtree', sans-serif",
};

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <AuthenticatedLayout>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card style={cardStyle} className="shadow-sm animate__animated animate__fadeIn">
              <Card.Body>
                <Card.Title style={titleStyle} className="text-center">
                  <i className="fas fa-lock mr-2"></i>
                  {t('help.privacy_policy.title')}
                </Card.Title>
                <p className="text-center" style={{ marginBottom: '2rem', opacity: 0.8 }}>
                  {t('help.privacy_policy.last_updated')}
                </p>

                <p style={paragraphStyle}>
                  {t('help.privacy_policy.intro')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.info_collect_title')}
                </h4>
                <p style={paragraphStyle}>
                  <strong>{t('help.privacy_policy.personal_info_label')}:</strong> {t('help.privacy_policy.personal_info_text')}
                  <br />
                  <strong>{t('help.privacy_policy.non_personal_info_label')}:</strong> {t('help.privacy_policy.non_personal_info_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.how_we_use_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.how_we_use_intro')}
                </p>
                <ul style={listStyle}>
                  <li>{t('help.privacy_policy.use_operate_services')}</li>
                  <li>{t('help.privacy_policy.use_personalize_experience')}</li>
                  <li>{t('help.privacy_policy.use_send_updates')}</li>
                  <li>{t('help.privacy_policy.use_research_analytics')}</li>
                </ul>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.data_security_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.data_security_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.cookies_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.cookies_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.third_party_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.third_party_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.children_privacy_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.children_privacy_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.changes_policy_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.changes_policy_text')}
                </p>

                <h4 style={sectionHeaderStyle}>
                  {t('help.privacy_policy.contact_us_title')}
                </h4>
                <p style={paragraphStyle}>
                  {t('help.privacy_policy.contact_us_text')}{' '}
                  <a href={route('help')} style={{ color: '#e94560', textDecoration: 'none' }}>
                    {t('help.privacy_policy.help_center_link')}
                  </a>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    </AuthenticatedLayout>
  );
};

export default PrivacyPolicy;
