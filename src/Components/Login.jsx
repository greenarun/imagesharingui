import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // For redirecting after login
import HeaderComp from "./HeaderNotLogged";
import Loading from "./Loading";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      // props.setIsAuthenticated(true)
      // Redirect to the file upload page or any protected route
      history("/dashboard", { replace: true });
      props.setIsAuthenticated(true);
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Invalid credentials. Please try again.");
      console.error(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderComp />
      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        {!loading ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {message && (
              <div
                class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
                role="alert"
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                </svg>
                <p>{message}</p>
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <Link to="/register" className="pt-4 block text-sky-500">
                Dont have account yet ? Register here
              </Link>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Login;
