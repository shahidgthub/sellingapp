import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import log from '../../public/images/Log.png';

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/login"), 2000); // ✅ Redirect after 2s
      } else {
        setErrorMessage(data.message || data.error || "Signup failed. Try again.");
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-500 bg-fixed">
      <header className="flex items-center justify-between container mx-auto py-6">
          <div className="flex space-x-2">
            <img src={log} alt="logo" className="w-[50px] h-[50px] rounded-full" />
            <h2 className="text-orange-500 pt-2 text-2xl">CourseHaven</h2>
          </div>
          <div className="space-x-4">
            <Link to={"/login"} className="bg-transparent text-white py-2 px-4 border rounded-xl text-xl">Login</Link>
            <Link to="/login" className="bg-orange-500 text-white py-2 px-4 rounded-xl text-xl">Join now</Link>
          </div>
        </header>
      <div className='flex items-center justify-center px-4'>
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          Welcome to <span className="text-orange-500">Course Heaven</span>
        </h1>
        <h2 className="text-xl font-semibold text-white text-center mb-4">
          Just Signup to Join Us!
        </h2>

        {errorMessage && (
          <p className="text-red-500 bg-red-100 p-2 rounded text-center mb-4">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 bg-green-100 p-2 rounded text-center mb-4">
            {successMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-white">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <label className="text-white">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <label className="text-white">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <label className="text-white">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 text-white py-3 rounded-lg font-semibold text-lg shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
