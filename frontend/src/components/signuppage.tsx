import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", formData);

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex flex-col justify-between">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join ZingZing Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Create your account and become part of the{" "}
            <strong>tech rebel squad</strong>
          </p>
        </section>

        <section className="flex-grow flex items-center justify-center py-16 px-6">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
              Sign Up
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="your_username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Create Account
              </button>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-indigo-600 hover:underline"
                >
                  Log in
                </NavLink>
              </p>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
