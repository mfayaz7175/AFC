import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function VerifyEmail({ status }) {
    const { t } = useTranslation();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('settings.email_verification_title')} />
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {t('settings.email_verification_description')}
            </div>
            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                    {t('settings.verification_link_sent')}
                </div>
            )}
            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        {t('settings.resend_verification_email')}
                    </PrimaryButton>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        {t('settings.logout')}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
