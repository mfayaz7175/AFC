// import React from 'react';
// import NewsCard from './NewsCard';

// const NewsFeed = ({ newsData, confirmDelete }) => {
//   if (!newsData || newsData.length === 0) {
//     return <p className="text-center">No news found.</p>;
//   }
//   return newsData.map((news) => <NewsCard key={news.id} news={news} confirmDelete={confirmDelete} />);
// };

// export default NewsFeed;


import React from 'react';
import NewsCard from './NewsCard';

export default function NewsFeed({ newsData, confirmDelete, onEdit }) {
  if (!newsData || newsData.length === 0) {
    return <p className="text-center">No news found.</p>;
  }
  return newsData.map(item => (
    <NewsCard
      key={item.id}
      news={item}
      confirmDelete={confirmDelete}
      onEdit={onEdit}
    />
  ));
}

