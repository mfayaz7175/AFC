

import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  FaHeading,
  FaListAlt,
  FaGlobe,
  FaImage,
  FaAlignLeft,
  FaArrowLeft,
} from 'react-icons/fa';

const NewsFormContent = ({ show, onHide, news = null, onSubmit }) => {
  const { t } = useTranslation();
  const isEdit = Boolean(news);

  // Initialize Inertia form with blank or news values
  const { data, setData, errors } = useForm({
    title: news?.title || '',
    description: news?.description || '',
    source: news?.source || '',
    category: news?.category || '',
    image: null,
  });

  // When `news` changes (i.e. you click edit on a different item),
  // repopulate the form fields
  useEffect(() => {
    setData({
      title: news?.title || '',
      description: news?.description || '',
      source: news?.source || '',
      category: news?.category || '',
      image: null,
    });
  }, [news]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('source', data.source);
    fd.append('category', data.category);
    if (data.image) fd.append('image', data.image);

    onSubmit(fd, isEdit);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdropClassName="bg-transparent backdrop-blur-sm"
      contentClassName="bg-transparent border-0 p-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden mx-3 my-6 shadow-2xl"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-40"
          style={{ filter: 'blur(14px)' }}
        />

        {/* Header */}
        <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-4 border-b border-white/20">
          <h2 className="text-white text-xl font-semibold flex items-center">
            <i className={`fas ${isEdit ? 'fa-edit' : 'fa-plus'} me-2`} />
            {isEdit ? t('news.edit_news') : t('news.add_news')}
          </h2>
        </div>

        {/* Body */}
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="relative z-10 p-6 text-gray-100 space-y-6"
        >
          {/* Title */}
          <Form.Group controlId="title">
            <Form.Label className="flex items-center mb-2 text-sm font-medium">
              <FaHeading className="me-2 text-blue-400" />
              {t('news.form.title')}
            </Form.Label>
            <Form.Control
              type="text"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              isInvalid={!!errors.title}
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
            <Form.Control.Feedback type="invalid" className="text-red-400">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Category & Source */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label className="flex items-center mb-2 text-sm font-medium">
                  <FaListAlt className="me-2 text-purple-400" />
                  {t('news.form.category')}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={data.category}
                  onChange={e => setData('category', e.target.value)}
                  isInvalid={!!errors.category}
                  className="bg-gray-800 text-gray-100 border-gray-700"
                />
                <Form.Control.Feedback type="invalid" className="text-red-400">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="source">
                <Form.Label className="flex items-center mb-2 text-sm font-medium">
                  <FaGlobe className="me-2 text-green-400" />
                  {t('news.form.source')}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={data.source}
                  onChange={e => setData('source', e.target.value)}
                  isInvalid={!!errors.source}
                  className="bg-gray-800 text-gray-100 border-gray-700"
                />
                <Form.Control.Feedback type="invalid" className="text-red-400">
                  {errors.source}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Image */}
          <Form.Group controlId="image">
            <Form.Label className="flex items-center mb-2 text-sm font-medium">
              <FaImage className="me-2 text-yellow-400" />
              {t('news.form.image')}
            </Form.Label>
            <Form.Control
              type="file"
              onChange={e => setData('image', e.target.files[0])}
              isInvalid={!!errors.image}
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
            <Form.Control.Feedback type="invalid" className="text-red-400">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="description">
            <Form.Label className="flex items-center mb-2 text-sm font-medium">
              <FaAlignLeft className="me-2 text-pink-400" />
              {t('news.form.description')}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              isInvalid={!!errors.description}
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
            <Form.Control.Feedback type="invalid" className="text-red-400">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        {/* Footer */}
        <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-4 border-t border-white/20 flex justify-between">
          <Button variant="outline-light" onClick={onHide}>
            <FaArrowLeft className="me-2" />
            {t('news.form.back')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <FaArrowLeft className="me-2" />
            {isEdit ? t('news.form.update_news') : t('news.form.create_news')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewsFormContent;
