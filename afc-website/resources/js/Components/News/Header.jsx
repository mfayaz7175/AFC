import React from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FlashMessage from '../FlashMessage';

const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const { t } = useTranslation();

  return (
    <header className="mb-4">
      <Row className="align-items-center">
        <Col md={6}>
          <h1 className="display-4">{t("news.header.title")}</h1>
        </Col>

        <Col md={6}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={t("news.header.search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
      <FlashMessage/>
      </Row>
      <hr />
    </header>
  );
};

export default Header;
