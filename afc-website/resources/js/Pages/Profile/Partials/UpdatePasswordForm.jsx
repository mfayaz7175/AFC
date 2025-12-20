// import { useRef } from 'react';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { useForm } from '@inertiajs/react';
// import { Transition } from '@headlessui/react';

// export default function UpdatePasswordForm({ className = '' }) {
//     const passwordInput = useRef();
//     const currentPasswordInput = useRef();

//     const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
//         current_password: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const updatePassword = (e) => {
//         e.preventDefault();

//         put(route('password.update'), {
//             preserveScroll: true,
//             onSuccess: () => reset(),
//             onError: (errors) => {
//                 if (errors.password) {
//                     reset('password', 'password_confirmation');
//                     passwordInput.current.focus();
//                 }

//                 if (errors.current_password) {
//                     reset('current_password');
//                     currentPasswordInput.current.focus();
//                 }
//             },
//         });
//     };

//     return (
//         <section className={className}>
//             <header>
//                 <h2 className="text-lg font-medium text-gray-100 dark:text-gray-100">Update Password</h2>

//                 <p className="mt-1 text-sm text-gray-100 dark:text-gray-100">
//                     Ensure your account is using a long, random password to stay secure.
//                 </p>
//             </header>

//             <form onSubmit={updatePassword} className="mt-6 space-y-6 ">
//                 <div>
//                     <InputLabel className="text-white" htmlFor="current_password" value="Current Password" />

//                     <input
//                         id="current_password"
//                         ref={currentPasswordInput}
//                         value={data.current_password}
//                         onChange={(e) => setData('current_password', e.target.value)}
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                     />

//                     <InputError message={errors.current_password} className="mt-2" />
//                 </div>

//                 <div>
//                     <InputLabel className="text-white" htmlFor="password" value="New Password" />

//                     <input
//                         id="password"
//                         ref={passwordInput}
//                         value={data.password}
//                         onChange={(e) => setData('password', e.target.value)}
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div>
//                     <InputLabel className="text-white" htmlFor="password_confirmation" value="Confirm Password" />

//                     <input
//                         id="password_confirmation"
//                         value={data.password_confirmation}
//                         onChange={(e) => setData('password_confirmation', e.target.value)}
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                     />

//                     <InputError message={errors.password_confirmation} className="mt-2" />
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <PrimaryButton disabled={processing}>Save</PrimaryButton>

//                     <Transition
//                         show={recentlySuccessful}
//                         enter="transition ease-in-out"
//                         enterFrom="opacity-0"
//                         leave="transition ease-in-out"
//                         leaveTo="opacity-0"
//                     >
//                         <p className="text-sm text-gray-100 dark:text-gray-100">Saved.</p>
//                     </Transition>
//                 </div>
//             </form>
//         </section>
//     );
// }



import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FiLock, FiKey, FiCheckCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function UpdatePasswordForm({ className = '' }) {
    const { t } = useTranslation();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100 dark:text-gray-100">
                    {t('settings.update_password_title')}
                </h2>
                <p className="mt-1 text-sm text-gray-100 dark:text-gray-100">
                    {t('settings.update_password_description')}
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6 ">
                <div>
                    <InputLabel className="text-white" htmlFor="current_password">
                        <FiLock className="inline-block dark:text-yellow-100 mr-2" />
                        {t('settings.current_password')}
                    </InputLabel>

                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel className="text-white" htmlFor="password">
                        <FiKey className="inline-block dark:text-yellow-100 mr-2" />
                        {t('settings.new_password')}
                    </InputLabel>

                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel className="text-white" htmlFor="password_confirmation">
                        <FiCheckCircle className="inline-block dark:text-yellow-100 mr-2" />
                        {t('settings.confirm_password')}
                    </InputLabel>

                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {t('settings.save')}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-100 dark:text-gray-100">
                            {t('settings.saved')}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
