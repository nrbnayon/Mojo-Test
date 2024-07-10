import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password").trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const userCredential = await signInUser(email, password);
      const user = userCredential.user;

      if (user) {
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password");
      } else {
        setError("Invalid email or password. Try again");
      }
    }
  };

  const handleFacebook = () => {
    setError(
      "Please try other options. This is not built yet! Still in progress."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome Back!
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-pink-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition duration-200"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">New to Mojo Test?</span>
            <Link
              to="/register"
              className="text-pink-600 font-bold hover:underline"
            >
              Register Now
            </Link>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="border-t w-full border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="border-t w-full border-gray-300"></div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleFacebook}
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaFacebook className="mr-2" /> Continue with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
