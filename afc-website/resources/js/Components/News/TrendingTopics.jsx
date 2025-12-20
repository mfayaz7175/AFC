import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const TrendingTopics = () => {
  const { t } = useTranslation();
  const topics = ['#BitcoinETF', '#EthereumMerge', '#DeFi', '#NFTs'];

  return (
    <Card className="mb-4 bg-glass shadow-2xl rounded-2xl overflow-hidden border border-white/20 backdrop-blur-lg transition-all duration-300 hover:shadow-3xl">
      <Card.Header className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 py-4 border-b border-white/20">
        <h3 className="mb-0 font-display flex items-center space-x-3 text-gray-900">
          <FiTrendingUp className="text-purple-400" />
          <span>{t("news.trending.topics_heading")}</span>
        </h3>
      </Card.Header>

      <ListGroup variant="flush" className="bg-transparent">
        {topics.map((topic, index) => (
          <ListGroup.Item
            key={index}
            className="bg-transparent hover:bg-gray-100 transition-colors duration-200 border-0 py-3 px-4 flex items-center justify-between group"
          >
            <span className="text-gray-800 group-hover:text-gray-900">{topic}</span>
            <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ↗
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl" />
    </Card>
  );
};

export default TrendingTopics;
