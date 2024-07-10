import { useEffect, useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import LoginImg from "/login.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser, loginWithGoogle, loginWithGithub } = useAuth();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password").trim();
    const userCaptchaValue = form.get("captcha");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateCaptcha(userCaptchaValue)) {
      setError("Captcha Does Not Match");
      return;
    }

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

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          profileImg: result.user?.photoURL,
          email: result.user?.email,
          role: "user",
        };
        axiosPublic.post("/users", userInfo);
        navigate(from, { replace: true });
        toast.success("Google Login Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGithubSignIn = () => {
    loginWithGithub()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          profileImg: result.user?.photoURL,
          email: result.user?.email,
        };
        axiosPublic.post("/users", userInfo);
        navigate(from, { replace: true });
        toast.success("GitHub Login successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSocialLogin = () => {
    setError(
      "Please try other options. This is not built yet! Still in progress."
    );
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-[95%] mx-auto flex-col lg:flex-row">
          <div className="md:w-1/2">
            <img src={LoginImg} alt="Login" />
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <h1 className="text-2xl md:text-5xl mt-4 text-center font-bold">
              Welcome Back!
            </h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <LoadCanvasTemplate />
                <input
                  type="text"
                  name="captcha"
                  placeholder="Enter captcha"
                  className="input input-bordered"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-center my-2">{error}</div>
              )}
              <div className="form-control">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="flex justify-center">
                <p className="text-sm">New to Bistro Boss?</p>
                <Link to="/register" className="ml-1 text-primary font-bold">
                  Register Now
                </Link>
              </div>
              <div className="divider my-0">OR</div>
              <h3 className="text-lg text-center font-semibold">
                Continue with
              </h3>
              <div className="flex items-center flex-wrap justify-evenly w-full">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-circle bg-red-600 text-white"
                >
                  <FaGoogle />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-700 text-white"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={handleGithubSignIn}
                  className="btn btn-circle bg-gray-800 text-white"
                >
                  <FaGithub />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-800 text-white"
                >
                  <FaLinkedin />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
