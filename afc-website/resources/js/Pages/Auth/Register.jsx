// import GuestLayout from '@/Layouts/GuestLayout';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
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
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
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
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
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
//                     <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

//                     <TextInput
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

//                 <div className="flex items-center justify-end mt-4">
//                     <Link
//                         href={route('login')}
//                         className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }


import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from 'react-router-dom';

const Register = ({ onClose, openLoginModal }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="max-w-sm w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl p-6 border border-white/10 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-indigo-300 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>


                <Head title="Register" />

                <h2 className="text-2xl font-bold text-center text-white">
                    Create an account
                </h2>
                <p className="mt-1 text-center text-xs text-white/80">
                    Join us! Please enter your details.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-white">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="mt-1 block w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-white">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="mt-1 block w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-white">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="mt-1 block w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-xs font-medium text-white">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            className="mt-1 block w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                        />
                        {errors.password_confirmation && <p className="mt-1 text-xs text-red-400">{errors.password_confirmation}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-1.5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                    >
                        Register
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-xs text-white/80">
                        Already registered?{' '}
                        <Link to={'/'}><button>login</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
