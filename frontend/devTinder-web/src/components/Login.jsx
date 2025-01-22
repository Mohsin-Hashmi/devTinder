import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPopup from "./ErrorPopup";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleshowPassword = () => {
    setShowPassword((show_password) => !show_password);
  };

  /**  Form validation */
  const validateForm = () => {
    let isValid = true;
    /**validation for email*/
    if (!emailId) {
      setErrorMessage("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      setErrorMessage("Invalid Email");
      isValid = false;
    }
    /**validation for password*/
    if (!password) {
      setErrorMessage("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      isValid = false;
    }
    return isValid;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/login`,
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(response.data)); // Dispatch only the serialized user data
        navigate("/feed"); // Navigate to profile page
        setErrorMessage("");
        setShowError(false);
      } catch (err) {
        setErrorMessage(err.message);
        setShowError(true);
      }
    } else {
      setShowError(true);
    }
  };

  const closeErrorPopup = () => {
    setShowError(false);
  };
  return (
    <>
      {showError && (
        <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />
      )}
      <div className="w-[600px] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form
          onSubmit={handleLogin}
          className="card-body p-[50px] m-auto w-1/2 border border-white rounded-3xl shadow-[0_15px_15px_rgba(255,255,255,0.3)]"
        >
          <h1 className=" card-title text-3xl font-bold text-white mb-4 flex items-center justify-center">
            Hi, Welcome Back! <span className="ml-2 animate-wave">👋</span>
          </h1>

          <label className="label-text">Enter you Email</label>
          <label className="input input-bordered flex items-center gap-2 mb-[18px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="label-text">Enter you Password</label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grow"
              placeholder="Password"
            />
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
              checked={showPassword}
              onChange={handleshowPassword}
            />
          </label>
          <div className="text-sm mt-4 flex justify-end">
           
            <Link to="" className="text-red-500 hover:underline ">
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="btn btn-wide mx-auto mt-[10px] border border-white hover:border-green-500"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm">
              Don’t have an account?
              <Link to="/signup" className="text-blue-600 hover:underline ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
