import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoginAnimation } from "../animations/Loading";

const RegisterModal = ({ onClose, openLoginModal }) => {
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
        <>
        {processing && <LoginAnimation />}
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="max-w-sm w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl p-6 border border-white/10 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-indigo-300 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                        <button
                            type="button"
                            onClick={() => {
                                console.log("Closing RegisterModal and opening LoginModal"); // Debugging
                                onClose(); // Close the RegisterModal
                                openLoginModal(); // Open the LoginModal
                            }}
                            className="text-indigo-300 hover:text-indigo-400 focus:outline-none"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default RegisterModal;
