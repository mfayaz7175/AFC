import { Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { LoginAnimation } from "../animations/Loading"; 

const LoginModal = ({ onClose, openRegisterModal, redirectAfterLogin }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });
 
  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onSuccess: () => {
        const redirectUrl =
          redirectAfterLogin && redirectAfterLogin.trim() !== ""
            ? redirectAfterLogin
            : route("dashboard");
        Inertia.visit(redirectUrl);
      },
      onFinish: () => reset("password"),
    });
  };

  return (
    <div>
      {/* When processing is true, display the loading animation */}
      {processing && <LoginAnimation />}

      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="max-w-md w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-white/10 relative">
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

          <h2 className="text-3xl font-extrabold text-center text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/80">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-6">
            {/* Email and Password Fields */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember"
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-white/80">
                  Remember me
                </label>
              </div>
              <Link
                href={route('password.request')}
                className="text-sm text-white hover:text-indigo-300"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </form>

          {/* Create Account Link */}
          <p className="mt-4 text-center text-sm text-white/80">
            Don't have an account?{' '}
            <button
              onClick={() => {
                onClose(); // Close the login modal
                openRegisterModal(); // Open the register modal
              }}
              className="text-indigo-400 hover:text-indigo-300"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
