// File: resources/js/Components/ui/OperationCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

const OperationCard = ({ href, label, children }) => {
  return (
    <div className="m-4 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
      <div className="px-4 py-3 text-xl font-semibold border-b border-white/30">
        {label}
      </div>
      <div className="p-6">
        <Link href={href} className="w-full h-full block">
          {children}
        </Link>
      </div>
    </div>
  );

};

export default OperationCard;
