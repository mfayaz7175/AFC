
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import { FaHeading, FaTag, FaDollarSign, FaImage } from 'react-icons/fa';
import { MdDescription, MdLocationOn, MdDateRange } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const EditAdModal = ({ ad, onClose, processing }) => {
  const { t } = useTranslation();
  const { data, setData, put, errors } = useForm({
    title: ad.title,
    image: null,
    price: ad.price,
    currency: ad.currency,
    description: ad.description,
    location: ad.location,
    expires_at: ad.expires_at,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/ad/${ad.id}`, {
      preserveState: true,
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      size="md"
      backdropClassName="bg-black/30 backdrop-blur-sm"
      contentClassName="bg-transparent border-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl mx-4 my-6"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-40"
          style={{ filter: 'blur(12px)' }}
        />

        {/* Header */}
        <Modal.Header className="relative z-10 bg-gray-900 border-b border-gray-700">
          <Modal.Title className="text-white">
            {t("ads.edit_modal.edit_ad")}
          </Modal.Title>
          <Button variant="close" onClick={onClose} className="text-white" />
        </Modal.Header>

        {/* Body */}
        <Modal.Body className="relative z-10 p-6 text-white">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            {/* Current Image */}
            <div>
              <label className="block mb-2 font-semibold">{t("ads.edit_modal.current_image")}</label>
              <img
                src={`/storage/${ad.image}`}
                alt={ad.title}
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center mb-1">
                <FaHeading className="mr-2 text-blue-400" /> {t("ads.edit_modal.ad_name")}
              </label>
              <input
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
              />
              {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center mb-1">
                <FaImage className="mr-2 text-yellow-400" /> {t("ads.edit_modal.new_image_optional")}
              </label>
              <div className="relative border border-dashed border-gray-600 rounded-md p-3 text-center hover:border-blue-300">
                <input
                  type="file"
                  onChange={e => setData('image', e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-gray-300">
                  {data.image ? data.image.name : t("ads.edit_modal.click_to_upload")}
                </p>
                <small className="text-gray-500">{t("ads.edit_modal.file_info")}</small>
              </div>
              {errors.image && <p className="mt-1 text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Price & Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center mb-1">
                  <FaTag className="mr-2 text-yellow-400" /> {t("ads.edit_modal.price")}
                </label>
                <input
                  type="number"
                  value={data.price}
                  onChange={e => setData('price', e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {errors.price && <p className="mt-1 text-red-500 text-sm">{errors.price}</p>}
              </div>
              <div>
                <label className="flex items-center mb-1">
                  <FaDollarSign className="mr-2 text-yellow-400" /> {t("ads.edit_modal.currency")}
                </label>
                <input
                  type="text"
                  value={data.currency}
                  onChange={e => setData('currency', e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {errors.currency && <p className="mt-1 text-red-500 text-sm">{errors.currency}</p>}
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center mb-1">
                  <MdDateRange className="mr-2 text-yellow-400" /> {t("ads.edit_modal.date")}
                </label>
                <input
                  type="date"
                  value={data.expires_at}
                  onChange={e => setData('expires_at', e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {errors.expires_at && <p className="mt-1 text-red-500 text-sm">{errors.expires_at}</p>}
              </div>
              <div>
                <label className="flex items-center mb-1">
                  <MdLocationOn className="mr-2 text-yellow-400" /> {t("ads.edit_modal.location")}
                </label>
                <input
                  type="text"
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
                />
                {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center mb-1">
                <MdDescription className="mr-2 text-yellow-400" /> {t("ads.edit_modal.description")}
              </label>
              <textarea
                rows={3}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
              />
              {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
            </div>
          </form>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer className="relative z-10 bg-gray-900 border-t border-gray-700">
          <Button variant="outline-light" onClick={onClose}>
            {t("ads.edit_modal.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={processing}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-600"
          >
            {processing
              ? t("ads.edit_modal.updating")
              : t("ads.edit_modal.update_ad")}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditAdModal;
