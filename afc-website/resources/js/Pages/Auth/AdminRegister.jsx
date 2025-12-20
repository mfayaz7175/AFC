// import GuestLayout from '@/Layouts/GuestLayout';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';

// import { Head, Link, useForm } from '@inertiajs/react';


// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         role: '',


//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('adminRegister'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };


//     return (
//         <>

//             <Head title="Register" />

//             <div className="container ">

//               <h1 className='text-white'>Admin Register</h1>
//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" className='text-white' />

//                     <input
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" className='text-white'  />

//                     <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" className='text-white'  />

//                     <input
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>



//                 <div className="mt-4">
//                     <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='text-white' />

//                     <input
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password_confirmation', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password_confirmation} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="role" value="role"  className='text-white' />
//                     <select id='role' name='role'  value={data.role} onChange={(e) => setData('role', e.target.value)}>
//                       <option value="FT_user">FT_user</option>
//                       <option  value="ST_user" >ST_user</option>
//                       <option  value="Admin" selected>Admin</option>
//                     </select>

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="flex items-center justify-end mt-4">
//                     <Link
//                         href={route('login')}
//                         className="underline  text-sm dark:text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>

//             </div>
//         </>
//     );
// }



import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiUserCheck } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('adminRegister'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={t('settings.register_title')} />
            <div className="container">
                <h1 className="text-white">{t('settings.admin_register')}</h1>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" className="text-white">
                            <FiUser className="inline-block mr-2 dark:text-yellow-100" />
                            {t('settings.name')}
                        </InputLabel>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-md"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" className="text-white">
                            <FiMail className="inline-block mr-2 dark:text-yellow-100" />
                            {t('settings.email')}
                        </InputLabel>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" className="text-white">
                            <FiLock className="inline-block mr-2 dark:text-yellow-100" />
                            {t('settings.password')}
                        </InputLabel>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-md"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" className="text-white">
                            <FiCheckCircle className="inline-block mr-2 dark:text-yellow-100" />
                            {t('settings.confirm_password')}
                        </InputLabel>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-md"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="role" className="text-white">
                            <FiUserCheck className="inline-block mr-2 dark:text-yellow-100" />
                            {t('settings.role')}
                        </InputLabel>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="mt-1 block w-full rounded-md"
                        >
                            <option value="FT_user">{t('settings.role_option_ft_user')}</option>
                            <option value="ST_user">{t('settings.role_option_st_user')}</option>
                            <option value="Admin">{t('settings.role_option_admin')}</option>
                        </select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            {t('settings.already_registered')}
                        </Link>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            {t('settings.register_button')}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
