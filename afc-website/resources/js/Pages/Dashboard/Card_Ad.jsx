import React from 'react';
import { usePage } from '@inertiajs/react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ news, confirmDelete }) => {
  const { auth } = usePage().props;
  const { t } = useTranslation();

  return ( 
    <Card className="group mb-6 bg-transparent shadow-2xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
      <div className="relative dark:bg-gray-900">
        <Card.Body className="flex flex-col md:flex-row gap-6 p-8 relative z-10">
          <div className="md:w-1/3 relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:shadow-xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src={news.image ? `/storage/${news.image}` : '/img/no-image.png'}
                alt={news.title}
                className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                {news.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
                {news.description}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-gray-800 px-3 py-1.5 rounded-full text-gray-300 font-medium border border-white/10">
                  {news.source}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 font-medium">
                  {news.timestamp || t("ads.adCard.na")}
                </span>
              </div>
            </div>

            {auth.can['viewAdminPanel'] && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => confirmDelete(news.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500/90 to-pink-500/90 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-red-500/20 hover:shadow-lg"
                >
                  <span className="font-medium">{t("ads.adCard.delete_article")}</span>
                </button>
              </div>
            )}
          </div>
        </Card.Body>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-purple-600/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-gray-900/30 to-purple-500/10 backdrop-blur-3xl" />
      </div>
    </Card>
  );
};

export default NewsCard;
