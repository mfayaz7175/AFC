import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  const { auth } = usePage().props;
  const initialForm = {
    name: '',
    email: auth.user.email,
    category: 'technical',
    message: '',
    attachment: null,
  };

  const [formData, setFormData] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData((prev) => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('message', formData.message);
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }
    Inertia.post(route('help.contact.store'), data, {
      onSuccess: () => {
        setShowModal(true);
        setFormData({ ...initialForm, email: auth.user.email });
      },
    });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    // <div  className="container my-5">
      <div className="card rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
        <div className="card-body rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
          <h2 className="card-title text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {t('contact_section.contact_support')}
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>
                    <i className="fas fa-user me-2"></i> {t('contact_section.name')}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact_section.enter_name')}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>
                    <i className="fas fa-envelope me-2"></i> {t('contact_section.email')}
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    plaintext
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>
                <i className="fas fa-tags me-2"></i> {t('contact_section.issue_category')}
              </Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="technical">{t('contact_section.technical_issue')}</option>
                <option value="account">{t('contact_section.account_issue')}</option>
                <option value="trading">{t('contact_section.trading_issue')}</option>
                <option value="other">{t('contact_section.other_issue')}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>
                <i className="fas fa-comment me-2"></i> {t('contact_section.message')}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact_section.describe_issue')}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAttachment" className="mt-3">
              <Form.Label>
                <i className="fas fa-paperclip me-2"></i>
                {t('contact_section.attachment_optional')}
              </Form.Label>
              <Form.Control type="file" name="attachment" onChange={handleChange} />
            </Form.Group>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit">
                {t('contact_section.submit_request')} <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </div>
          </Form>
        </div>


      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <i className="fas fa-thumbs-up text-white me-2"></i> {t('contact_section.thank_you')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success">
            {t('contact_section.request_submitted')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success m-auto" onClick={handleCloseModal}>
            {t('contact_section.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactSection;
