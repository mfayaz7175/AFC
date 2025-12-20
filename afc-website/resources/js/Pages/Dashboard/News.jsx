
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import { DeleteAnimation } from '@/Components/animations/Loading';
import Header from '@/Components/News/Header';
import Categories from '@/Components/News/Categories';
import TrendingTopics from '@/Components/News/TrendingTopics';
import NewsFeed from '@/Components/News/NewsFeed';
import Pagination from '@/Components/News/Pagination';
import Footer from '@/Components/News/Footer';
import DeleteConfirmationModal from '@/Components/ManageRef/DeleteConfirmationModal';
import NewsFormContent from './NewsFormContent';
import { useTranslation } from 'react-i18next';
import GlobalAdPopup from '@/Components/GlobalAdPopup';

const News = () => {
  const { t } = useTranslation();
  const { auth, categories, news: newsPage, search: initSearch, selectedCategory: initCat } = usePage().props;

  // Delete state
  const [deleteData, setDeleteData] = useState({ show: false, id: null, type: 'news' });
  const [isDeleting, setIsDeleting] = useState(false);

  // Add/Edit state
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState(initSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initCat || 'all');

  // Delete handlers
  const confirmDelete = (id) => setDeleteData({ show: true, id, type: 'news' });
  const closeDelete = () => setDeleteData(d => ({ ...d, show: false }));
  const doDelete = () => {
    setIsDeleting(true);
    Inertia.delete(route('news.destroy', deleteData.id), {
      onFinish: () => {
        setIsDeleting(false);
        closeDelete();
      }
    });
  };

  // Search / category
  const handleSearch = e => {
    e.preventDefault();
    Inertia.get(route('news.index'), { search: searchTerm, category: selectedCategory }, {
      preserveState: true,
      preserveScroll: true,
    });
  };
  const handleCategoryClick = cat => {
    setSelectedCategory(cat);
    Inertia.get(route('news.index'), { search: searchTerm, category: cat }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Add/Edit form
  const openAdd = () => {
    setIsEditing(false);
    setEditItem(null);
    setShowForm(true);
  };
  const openEdit = item => {
    setIsEditing(true);
    setEditItem(item);
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  const handleFormSubmit = (formData, editing) => {
    if (editing) {
      // override to PUT when uploading files
      formData.append('_method', 'PUT');
      Inertia.post(
        route('news.update', editItem.id),
        formData,
        {
          forceFormData: true,
          onSuccess: () => setShowForm(false),
        }
      );
    } else {
      Inertia.post(
        route('news.store'),
        formData,
        {
          forceFormData: true,
          onSuccess: () => setShowForm(false),
        }
      );
    }
  };


  return (
    <AuthenticatedLayout>
      {isDeleting && <DeleteAnimation />}

      <Container fluid className="py-4">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        <Row className="mt-4">
          <Col md={3}>
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />
            <TrendingTopics />
            {auth.can.viewAdminPanel && (
              <Button
                onClick={openAdd}
                variant="success"
                className="w-100 mt-3"
              >
                <i className="fas fa-plus me-2" /> {t('news.add_news')}
              </Button>
            )}
            <GlobalAdPopup/>
          </Col>

          <Col md={9}>
            <NewsFeed
              newsData={newsPage.data}
              confirmDelete={confirmDelete}
              onEdit={openEdit}
            />
            <Pagination
              pagination={newsPage}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          </Col>

        </Row>

        <Footer />
      </Container>

      {/* Delete Confirmation */}
      <DeleteConfirmationModal
        deleteData={deleteData}
        closeDeleteConfirmation={closeDelete}
        confirmDeletion={doDelete}
      />

      {/* Add / Edit Modal */}
      <NewsFormContent
        show={showForm}
        onHide={closeForm}
        news={isEditing ? editItem : null}
        onSubmit={handleFormSubmit}
      />
    </AuthenticatedLayout>
  );
};

export default News;
