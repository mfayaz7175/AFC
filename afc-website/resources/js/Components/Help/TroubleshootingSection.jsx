import React, { useState } from 'react';
import HelpForm from './HelpForm';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

export const TroubleshootingSection = ({ entries = [], isAdmin, userEmail }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredBySearch = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleEntries = isAdmin
    ? filteredBySearch
    : filteredBySearch.filter((entry) => entry.status === 1);

  const handleAddClick = () => {
    setFormMode('create');
    setSelectedEntry(null);
    setShowModal(true);
  };

  const handleEditClick = (entry) => {
    setFormMode('edit');
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const handleAnswerClick = (entry) => {
    setFormMode('answer');
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const handleDelete = (entry) => {
    if (confirm(t('help.troubleshooting_section.delete_confirmation'))) {
      Inertia.delete(route('help.entry.destroy', entry.id));
    }
  };

  const handleSave = (data) => {
    if (formMode === 'create') {
      Inertia.post(route('help.entry.store'), data);
    } else if (formMode === 'edit' || formMode === 'answer') {
      Inertia.put(route('help.entry.update', selectedEntry.id), data);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{t('help.troubleshooting_section.title')}</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 text-blue-600 hover:underline"
        >
          <i className="fas fa-plus-circle"></i>
          <span>{t('help.troubleshooting_section.add_issue')}</span>
        </button>
      </div>
      <input
        type="text"
        placeholder={t('help.troubleshooting_section.search_issues')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className="mb-6 text-gray-700">
        {t('help.troubleshooting_section.description')}
      </p>
      <div className="space-y-4">
        {visibleEntries.map((entry) => (
          <TroubleshootingItem
            key={entry.id}
            entry={entry}
            isAdmin={isAdmin}
            onEdit={() => handleEditClick(entry)}
            onAnswer={() => handleAnswerClick(entry)}
            onDelete={() => handleDelete(entry)}
          />
        ))}
      </div>
      <HelpForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        mode={formMode}
        entry={selectedEntry}
        onSave={handleSave}
        isAdmin={isAdmin}
        userEmail={userEmail}
      />
    </div>
  );
};

const TroubleshootingItem = ({ entry, isAdmin, onEdit, onAnswer, onDelete }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-4 bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors"
      >
        <span className="text-lg font-medium text-gray-700 flex items-center">
          {entry.title}
          {isAdmin && entry.status === 0 && (
            <i className="fas fa-eye-slash text-red-500 ml-2" title={t('help.troubleshooting_section.hidden')}></i>
          )}
        </span>
        <div className="flex space-x-3">
          {isAdmin && (
            <>
              <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onAnswer(); }} className="text-green-500 hover:text-green-700">
                <i className="fas fa-comment-medical"></i>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 hover:text-red-700">
                <i className="fas fa-trash"></i>
              </button>
            </>
          )}
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`px-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4 border-t border-gray-200' : 'max-h-0 overflow-hidden'}`}>
        <p className="text-gray-600">{entry.content}</p>
      </div>
    </div>
  );
};

export default TroubleshootingSection;
