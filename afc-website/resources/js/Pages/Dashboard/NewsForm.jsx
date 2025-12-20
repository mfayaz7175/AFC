
// export default NewsForm;
import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
  FaHeading,
  FaListAlt,
  FaGlobe,
  FaImage,
  FaAlignLeft,
  FaArrowLeft,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function NewsForm({ news = null, onSubmit }) {
  const { t } = useTranslation();
  const isEdit = !!news;

  const { data, setData, post, put, errors } = useForm({
    title: news?.title || '',
    description: news?.description || '',
    source: news?.source || '',
    category: news?.category || '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('title', data.title);
    payload.append('description', data.description);
    payload.append('source', data.source);
    payload.append('category', data.category);
    if (data.image) payload.append('image', data.image);

    if (onSubmit) {
      onSubmit(payload, isEdit);
    } else if (isEdit) {
      put(route('news.update', news.id), payload);
    } else {
      post(route('news.store'), payload);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data" className="text-white">
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>
          <FaHeading className="me-2 text-blue-400" />
          {t('news.form.title')}
        </Form.Label>
        <Form.Control
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          isInvalid={!!errors.title}
          className="bg-gray-800 text-white border-gray-700"
        />
        <Form.Control.Feedback type="invalid" className="text-red-400">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="category">
            <Form.Label>
              <FaListAlt className="me-2 text-purple-400" />
              {t('news.form.category')}
            </Form.Label>
            <Form.Control
              type="text"
              value={data.category}
              onChange={(e) => setData('category', e.target.value)}
              isInvalid={!!errors.category}
              className="bg-gray-800 text-white border-gray-700"
            />
            <Form.Control.Feedback type="invalid" className="text-red-400">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="source">
            <Form.Label>
              <FaGlobe className="me-2 text-green-400" />
              {t('news.form.source')}
            </Form.Label>
            <Form.Control
              type="text"
              value={data.source}
              onChange={(e) => setData('source', e.target.value)}
              isInvalid={!!errors.source}
              className="bg-gray-800 text-white border-gray-700"
            />
            <Form.Control.Feedback type="invalid" className="text-red-400">
              {errors.source}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="image" className="mb-3">
        <Form.Label>
          <FaImage className="me-2 text-yellow-400" />
          {t('news.form.image')}
        </Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setData('image', e.target.files[0])}
          isInvalid={!!errors.image}
          className="bg-gray-800 text-white border-gray-700"
        />
        <Form.Control.Feedback type="invalid" className="text-red-400">
          {errors.image}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>
          <FaAlignLeft className="me-2 text-pink-400" />
          {t('news.form.description')}
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          isInvalid={!!errors.description}
          className="bg-gray-800 text-white border-gray-700"
        />
        <Form.Control.Feedback type="invalid" className="text-red-400">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="outline-light" onClick={() => window.history.back()}>
          <FaArrowLeft className="me-1" />
          {t('news.form.back')}
        </Button>
        <Button type="submit" variant="primary">
          <FaArrowLeft className="me-1" />
          {isEdit ? t('news.form.update') : t('news.form.create')}
        </Button>
      </div>
    </Form>
  );
}
