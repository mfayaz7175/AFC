import React, { useEffect, useState } from 'react';

const cardStyles = [
  {
    container: 'flex items-center p-3 sm:p-4 md:p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700', // Removed shadow and rounded corners
    img: 'w-1/2 h-28 sm:h-36 md:h-44 object-cover border-2 border-gray-100 dark:border-gray-700', // Slightly smaller image height
    content: 'ml-3 sm:ml-4 md:ml-5 flex-1',
    title: 'text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100',
    price: 'text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400',
  },
  {
    container: 'flex items-center p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border border-blue-200 dark:border-blue-700', // Removed shadow and rounded corners
    img: 'w-1/2 h-24 sm:h-32 md:h-40 object-cover border-2 border-white dark:border-gray-800', // Slightly smaller image height
    content: 'ml-2 sm:ml-3 md:ml-4 flex-1',
    title: 'text-md sm:text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-200',
    price: 'text-sm sm:text-base md:text-lg text-blue-600 dark:text-blue-400',
  },
  {
    container: 'flex items-center p-2 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-600', // Removed shadow and rounded corners
    img: 'w-1/2 h-20 sm:h-28 md:h-36 object-cover', // Slightly smaller image height
    content: 'ml-2 sm:ml-3 md:ml-4 flex-1',
    title: 'text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-200',
    price: 'text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400',
  },
];

const GlobalAdPopup = () => {
  const [adsToShow, setAdsToShow] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [visibleAds, setVisibleAds] = useState({});

  useEffect(() => {
    fetch('/global-ads')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const count = data.length <= 3 ? data.length : 3;
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, count);
          const styledAds = selected.map(ad => ({
            ...ad,
            styleIndex: Math.floor(Math.random() * cardStyles.length),
          }));
          setAdsToShow(styledAds);
          setShowPopup(true);

          const initialVisibility = {};
          styledAds.forEach(ad => {
            initialVisibility[ad.id] = { card: true, closeButton: false };
            setTimeout(() => {
              setVisibleAds(prev => ({
                ...prev,
                [ad.id]: { ...prev[ad.id], closeButton: true },
              }));
            }, 5000);
          });
          setVisibleAds(initialVisibility);
        }
      })
      .catch(err => console.error('Error fetching ads:', err));
  }, []);

  if (!showPopup || adsToShow.length === 0) return null;

  const closeAd = (adId) => {
    setVisibleAds(prev => ({
      ...prev,
      [adId]: { ...prev[adId], card: false },
    }));
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 space-y-3 sm:space-y-4 md:space-y-5 max-w-[280px] sm:max-w-sm md:max-w-md">
      {adsToShow.map(ad => {
        if (!visibleAds[ad.id]?.card) return null;
        const style = cardStyles[ad.styleIndex];
        return (
          <div
            key={ad.id}
            className={`relative bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 p-2 sm:p-3 md:p-4 ${style.container}`} // Removed backdrop-blur, shadow, and rounded corners
          >
            {visibleAds[ad.id]?.closeButton && (
              <button
                onClick={() => closeAd(ad.id)}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                aria-label="Close ad"
              >
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            <img
              src={`/storage/${ad.image}`}
              alt={ad.title}
              className={style.img}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <div className={style.content}>
              <div className={style.title}>{ad.title}</div>
              <div className={style.price}>
                {ad.price} {ad.currency}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GlobalAdPopup;
