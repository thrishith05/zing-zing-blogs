import { NavLink } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex flex-col justify-between">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome Back to ZingZing{" "}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Log in and reconnect with your favorite dev stories, tips &
            community vibes!
          </p>
        </section>

        <section className="flex-grow flex items-center justify-center py-16 px-6">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
              Log In
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Log In
              </button>
              <p className="text-sm text-center text-gray-600">
                New here?{" "}
                <NavLink
                  to="/signup"
                  className="text-indigo-600 hover:underline"
                >
                  Create an account
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
