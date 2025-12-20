import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Categories = ({ categories, selectedCategory, onCategoryClick }) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-4 bg-glass shadow-2xl rounded-2xl overflow-hidden border border-white/20 backdrop-blur-lg transition-all duration-300 hover:shadow-3xl">
      <Card.Header className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 py-4 border-b border-white/20">
        <h3 className="mb-0 font-display flex items-center space-x-3 text-gray-900">
          <strong>{t("news.categories.heading")}</strong>
        </h3>
      </Card.Header>

      <ListGroup variant="flush" className="bg-transparent">
        {['all', ...categories].map((cat, index) => (
          <ListGroup.Item
            key={index}
            action
            active={selectedCategory === cat}
            onClick={() => onCategoryClick(cat)}
            className={`bg-transparent hover:bg-gray-100 transition-colors duration-200 border-0 py-3 px-4 flex items-center justify-between group ${
              selectedCategory === cat ? 'bg-purple-100 text-gray-900' : 'text-gray-800'
            }`}
          >
            <span className="group-hover:text-gray-900 text-gray-500">
              {cat === 'all' ? t("news.categories.all_news") : cat}
            </span>
            {selectedCategory === cat && (
              <span className="text-gray-500">✓</span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl" />
    </Card>
  );
};

export default Categories;
