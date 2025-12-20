import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

const TutorialFormModal = ({ show, onHide, tutorial }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    youtubeLink: '',
    profileImageFile: null,
  });
 
  useEffect(() => {
    if (tutorial) {
      setFormData({
        title: tutorial.title,
        description: tutorial.description,
        videoFile: null, // files are not pre-loaded
        youtubeLink: tutorial.youtube_link || '',
        profileImageFile: null,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        videoFile: null,
        youtubeLink: '',
        profileImageFile: null,
      });
    }
  }, [tutorial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.videoFile) data.append('videoFile', formData.videoFile);
    data.append('youtubeLink', formData.youtubeLink);
    if (formData.profileImageFile) data.append('profileImageFile', formData.profileImageFile);

    if (tutorial) {
      // For update, add _method override and use Inertia.post
      data.append('_method', 'PUT');
      Inertia.post(route('help.tutorial.update', tutorial.id), data);
    } else {
      Inertia.post(route('help.tutorial.store'), data);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white" closeVariant="white">
        <Modal.Title>
          {tutorial ? t('help.tutorial_form.update_tutorial') : t('help.tutorial_form.add_new_tutorial')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="bg-light">
          <Form.Group className="mb-3">
            <Form.Label>{t('help.tutorial_form.title')}</Form.Label>
            <Form.Control 
              type="text" 
              placeholder={t('help.tutorial_form.enter_title')} 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('help.tutorial_form.description')}</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder={t('help.tutorial_form.enter_description')} 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>{t('help.tutorial_form.video_file_upload')}</Form.Label>
                <Form.Control 
                  type="file" 
                  name="videoFile" 
                  accept="video/*" 
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>{t('help.tutorial_form.profile_image_upload')}</Form.Label>
                <Form.Control 
                  type="file" 
                  name="profileImageFile" 
                  accept="image/*" 
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>{t('help.tutorial_form.youtube_link')}</Form.Label>
            <Form.Control 
              type="text" 
              placeholder={t('help.tutorial_form.enter_youtube_link')} 
              name="youtubeLink" 
              value={formData.youtubeLink} 
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={onHide}>
            {t('help.tutorial_form.cancel')}
          </Button>
          <Button variant="primary" type="submit">
            {tutorial ? t('help.tutorial_form.update') : t('help.tutorial_form.add')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TutorialFormModal;
