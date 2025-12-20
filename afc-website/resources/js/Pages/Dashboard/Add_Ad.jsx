import React from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import './style/Add_Ad.css';
import Header from './BlurHeader';
import { MdTitle, MdImage, MdDescription, MdAttachMoney, MdOutlineCurrencyExchange, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import FlashMessage from '@/Components/FlashMessage';
 
const CreateAd = () => {
  const { t } = useTranslation();
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    image: null,
    price: '',
    currency: '',
    description: '',
    location: '',
    expires_at: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/ad');
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {t("ads.products")}
        </h2>
      }
    >
      <Head title={t("ads.products")} />
      <div className="my-8 ">
        <Header title={t("ads.header.add_ad")} />
        <FlashMessage/>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-dark p-4">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
              {t("ads.create_ad.create_new_ad")}
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
              {/* Ad Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-200 pb-2">
                  {t("ads.create_ad.ad_details")}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block flex text-sm font-semibold text-blue-600">
                      <MdTitle className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.ad_name")}
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder={t("ads.form.enter_ad_title")}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    {errors.title && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.title}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="image" className="block flex text-sm font-semibold text-blue-600">
                      <MdImage className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.image")}
                    </label>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => setData('image', e.target.files[0])}
                      className="mt-1 block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-200"
                    />
                    {errors.image && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.image}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block flex text-sm font-semibold text-blue-600">
                    <MdDescription className="mr-2 fs-5 text-yellow-500 text-base" />
                    {t("ads.form.description")}
                  </label>
                  <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder={t("ads.form.describe_your_ad")}
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    rows="2"
                  />
                  {errors.description && (
                    <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                      <span className="mr-1">⚠️</span> {errors.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Location Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-200 pb-2">
                  {t("ads.form.pricing_location")}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block flex text-sm font-semibold text-blue-600">
                      <MdAttachMoney className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.price")}
                    </label>
                    <input
                      id="price"
                      type="number"
                      value={data.price}
                      onChange={(e) => setData('price', e.target.value)}
                      placeholder={t("ads.form.enter_price")}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    {errors.price && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.price}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="currency" className="block flex text-sm font-semibold text-blue-600">
                      <MdOutlineCurrencyExchange className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.currency")}
                    </label>
                    <input
                      id="currency"
                      type="text"
                      value={data.currency}
                      onChange={(e) => setData('currency', e.target.value)}
                      placeholder={t("ads.form.currency_placeholder")}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    {errors.currency && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.currency}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="location" className="block flex text-sm font-semibold text-blue-600">
                      <MdLocationOn className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.location")}
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={data.location}
                      onChange={(e) => setData('location', e.target.value)}
                      placeholder={t("ads.form.enter_location")}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    {errors.location && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.location}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="expires_at" className="block flex text-sm font-semibold text-blue-600">
                      <MdAccessTime className="mr-2 fs-5 text-yellow-500 text-base" />
                      {t("ads.form.expires_at")}
                    </label>
                    <input
                      id="expires_at"
                      type="date"
                      value={data.expires_at}
                      onChange={(e) => setData('expires_at', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    {errors.expires_at && (
                      <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                        <span className="mr-1">⚠️</span> {errors.expires_at}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center transition duration-200"
              >
                {processing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("ads.form.creating")}
                  </>
                ) : (
                  t("ads.form.create_ad")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreateAd;
