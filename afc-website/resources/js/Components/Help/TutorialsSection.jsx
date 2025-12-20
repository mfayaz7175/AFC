import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import FullTutorialModal from './FullTutorial';
import VideoModal from './VideoModal';
import TutorialFormModal from './TutorialForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

const TutorialsSection = ({ tutorials, isAdmin }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showFullTutorial, setShowFullTutorial] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTutorialForm, setShowTutorialForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredTutorials = tutorials.data.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadMore = tutorial => {
    setSelectedTutorial(tutorial);
    setShowFullTutorial(true);
  };

  const handleVideoModal = tutorial => {
    setSelectedTutorial(tutorial);
    setShowVideoModal(true);
  };

  const handleUpdateTutorial = tutorial => {
    setSelectedTutorial(tutorial);
    setShowTutorialForm(true);
  };

  const handleDeleteTutorial = tutorial => {
    setSelectedTutorial(tutorial);
    setShowDeleteModal(true);
  };

  return (
    <div className="container my-4 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-4">
      {/* Header with title and admin-only Add New Tutorial button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">{t('help.tutorials_section.title')}</h2>
        {isAdmin && (
          <Button variant="primary" onClick={() => { setSelectedTutorial(null); setShowTutorialForm(true); }}>
            {t('help.tutorials_section.add_new_tutorial')}
          </Button>
        )}
      </div>

      {/* Search input */}
      <InputGroup className="mb-4">
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder={t('help.tutorials_section.search_tutorials')}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Card Grid */}
      <div className="row">
        {filteredTutorials.map(tutorial => (
          <div key={tutorial.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.41)' }}>
              <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
                <h5 className="card-title mb-0" style={{ flex: 1, marginRight: '10px' }}>
                  {tutorial.title}
                </h5>
                <div style={{ flexShrink: 0 }}>
                  {tutorial.profile_image ? (
                    <img
                      src={`/storage/${tutorial.profile_image}`}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: '70px',
                        height: '70px',
                        border: '2px solid black',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '70px',
                      height: '70px',
                      border: '2px solid black',
                      borderRadius: '50%',
                      backgroundColor: '#ccc'
                    }} />
                  )}
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {tutorial.description.length > 60
                    ? `${tutorial.description.substring(0, 60)}...`
                    : tutorial.description}{' '}
                  <a href="#!" className="text-primary" onClick={() => handleReadMore(tutorial)}>
                    {t('help.tutorials_section.read_more')} &rarr;
                  </a>
                </p>
                <div className="d-flex justify-content-center my-4">
                  <a
                    href={tutorial.youtube_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-danger"
                    style={{ width: '90%' }}
                  >
                    <i className="fab fa-youtube"></i> {t('help.tutorials_section.complete_video')}
                  </a>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
                <Button variant="outline-secondary" onClick={() => handleVideoModal(tutorial)}>
                  <i className="fas fa-play"></i>
                </Button>
                {isAdmin && (
                  <div>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdateTutorial(tutorial)}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTutorial(tutorial)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          {tutorials.links.map((link, index) => (
            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url === null ? 'disabled' : ''}`}>
              <Link
                className="page-link"
                href={link.url || '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Modals */}
      {selectedTutorial && (
        <FullTutorialModal
          show={showFullTutorial}
          onHide={() => setShowFullTutorial(false)}
          tutorial={selectedTutorial}
        />
      )}

      {selectedTutorial && (
        <VideoModal
          show={showVideoModal}
          onHide={() => setShowVideoModal(false)}
          tutorial={selectedTutorial}
        />
      )}

      <TutorialFormModal
        show={showTutorialForm}
        onHide={() => setShowTutorialForm(false)}
        tutorial={selectedTutorial}
      />

      {selectedTutorial && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={() => {
            Inertia.delete(route('help.tutorial.destroy', selectedTutorial.id));
          }}
          title={t('help.tutorials_section.delete_tutorial_title')}
          body={t('help.tutorials_section.delete_tutorial_body', { title: selectedTutorial.title })}
        />
      )}
    </div>
  );
};

export default TutorialsSection;
