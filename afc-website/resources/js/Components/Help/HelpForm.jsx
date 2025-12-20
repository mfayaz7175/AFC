import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HelpForm = ({ show, handleClose, mode, entry, onSave, isAdmin, userEmail }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    entry_type: entry?.entry_type || 'faq',
    title: entry?.title || '',
    content: entry?.content || '',
    user_email: entry?.user_email || (mode === 'create' ? userEmail : ''),
    status: entry?.status !== undefined ? entry?.status : 0,
  });

  // Helper to format created_at date as YYYY/MM/DD
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    setFormData({
      entry_type: entry?.entry_type || 'faq',
      title: entry?.title || '',
      content: entry?.content || '',
      user_email: entry?.user_email || (mode === 'create' ? userEmail : ''),
      status: entry?.status !== undefined ? entry?.status : 0,
    });
  }, [entry, show, mode, userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  const getModalTitle = () => {
    if (mode === 'create') {
      return (
        <>
          <i className="fas fa-plus-circle me-2"></i> {t('help.help_form.add_new_entry')}
        </>
      );
    }
    if (mode === 'edit') {
      return (
        <>
          <i className="fas fa-edit me-2"></i> {t('help.help_form.edit_entry')}
        </>
      );
    }
    if (mode === 'answer') {
      return (
        <>
          <i className="fas fa-comment-medical me-2"></i> {t('help.help_form.add_answer')}
        </>
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Entry Type Selector */}
          <Form.Group className="mb-3">
            <Form.Label className="text-start">
              <i className="fas fa-info-circle me-1"></i> {t('help.help_form.entry_type')}
            </Form.Label>
            <Form.Select name="entry_type" value={formData.entry_type} onChange={handleChange}>
              <option value="faq">{t('help.help_form.faq')}</option>
              <option value="troubleshooting">{t('help.help_form.troubleshooting')}</option>
            </Form.Select>
          </Form.Group>
          {/* Title Input */}
          <Form.Group className="mb-3">
            <Form.Label className="text-start">
              <i className="fas fa-heading me-1"></i> {t('help.help_form.title')}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={t('help.help_form.enter_title')}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Content/Answer Input */}
          <Form.Group className="mb-3">
            <Form.Label className="text-start">
              <i className="fas fa-align-left me-1"></i> {t('help.help_form.content')}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder={t('help.help_form.enter_content')}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Row: User Email and Status Toggle */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-50 pe-2">
              <Form.Group>
                <Form.Label className="text-start">
                  <i className="fas fa-envelope me-1"></i> {t('help.help_form.user_email')}
                </Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    readOnly
                    plaintext
                  />
                  {isAdmin && entry?.created_at && (
                    <span className="ms-2 text-muted" style={{ fontSize: '0.8rem' }}>
                      <i className="fas fa-clock me-1"></i> {formatDate(entry.created_at)}
                    </span>
                  )}
                </div>
              </Form.Group>
            </div>
            {isAdmin && (
              <div className="w-50 ps-2 d-flex justify-content-end">
                <Form.Check 
                  type="switch"
                  id="status-switch"
                  name="status"
                  label={<span><i className="fas fa-toggle-on me-1"></i>{t('help.help_form.displayed')}</span>}
                  checked={formData.status === 1}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            <i className="fas fa-times me-1"></i> {t('help.help_form.cancel')}
          </Button>
          <Button variant="secondary" type="submit">
            <i className="fas fa-save me-1"></i> {t('help.help_form.save_changes')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default HelpForm;
