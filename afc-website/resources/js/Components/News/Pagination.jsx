import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Pagination = ({ pagination, searchTerm, selectedCategory }) => {
  const handlePageChange = (url) => {
    if (url) {
      Inertia.get(url, { search: searchTerm, category: selectedCategory }, { preserveState: true, preserveScroll: true });
    }
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <nav>
        <ul className="pagination">
          {pagination.links.map((link, index) => (
            <li
              key={index}
              className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
