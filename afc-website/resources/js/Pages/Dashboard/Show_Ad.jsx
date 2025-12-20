import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FiEye, FiEdit, FiTrash2, FiMapPin } from 'react-icons/fi';
import { usePage } from '@inertiajs/react';
import DeleteModal from '@/Components/News/DeleteModal';
import EditAdModal from './Edit_Ad';
import Footer from '@/Components/News/Footer';
import Header from './BlurHeader';
import { useTranslation } from 'react-i18next';
import FlashMessage from '@/Components/FlashMessage';

export default function ShowAd({ ad }) {
  const { t } = useTranslation(); 
  const { auth } = usePage().props;
  const [adList, setAdList] = useState(ad);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const handleConfirmDelete = () => {
    if (adToDelete) {
      Inertia.delete(`/ad/${adToDelete}`, {
        onSuccess: () => {
          setAdList((prevList) => prevList.filter((ad) => ad.id !== adToDelete));
        },
      });
      setShowDeleteModal(false);
      setAdToDelete(null);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Header title={t("ads.show_ad.manage_ads")} />
          </div>
          <FlashMessage/>

          {/* Advertisements Table */}
          <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
            {adList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-blue-900/30 to-purple-900/30">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-blue-400">
                        {t("ads.show_ad.image")}
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-blue-400">
                        {t("ads.show_ad.title")}
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-blue-400">
                        {t("ads.show_ad.location")}
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-blue-400">
                        {t("ads.show_ad.price")}
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-blue-400">
                        {t("ads.show_ad.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {adList.map((ad) => (
                      <tr key={ad.id} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="h-16 w-16 rounded-lg overflow-hidden">
                            <img
                              src={`/storage/${ad.image}`}
                              alt={ad.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-100 font-medium">{ad.title}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-400">
                            <FiMapPin className="mr-2 text-blue-400" />
                            <span>{ad.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                            {ad.currency} {ad.price}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => (window.location.href = `/ad/${ad.id}`)}
                              className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-blue-400 hover:text-blue-300 focus:outline-none"
                            >
                              <FiEye className="text-xl" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAd(ad);
                                setShowEditModal(true);
                              }}
                              className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none"
                            >
                              <FiEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => {
                                setAdToDelete(ad.id);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300 focus:outline-none"
                            >
                              <FiTrash2 className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-2xl font-light text-gray-400">{t("ads.show_ad.no_listings_found")}</h3>
                <p className="text-gray-500 mt-2">{t("ads.show_ad.start_creating_ad")}</p>
              </div>
            )}
          </div>

          <Footer className="mt-12 border-t border-gray-700" />
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
      {showEditModal && (
        <EditAdModal ad={selectedAd} onClose={() => setShowEditModal(false)} />
      )}
    </AuthenticatedLayout>
  );
}
