"use client";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        setSuccessMessage(" Login successful!");
        setEmail("");
        setPassword("");
      } else {
        setErrorMessage(data.message || data.error || " Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage(` Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-500 flex items-center justify-center px-4">
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          Login to <span className="text-orange-500">Course Heaven</span>
        </h2>
        <h3 className=" text-white text-center mb-4">Just Login to Join Us!</h3>


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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 text-white py-3 rounded-lg font-semibold text-lg shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
