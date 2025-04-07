import Footer from "./footer";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import blogs from "../data/one.ts";

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex flex-col justify-between">
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                <span className="font-medium">by {blog.author}</span> ·{" "}
                {blog.date}
              </p>
              <p className="text-gray-700">{blog.summary}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Read More
              </Link>
            </div>
          ))}
        </section>
        <Footer />
      </div>
    </>
  );
}
