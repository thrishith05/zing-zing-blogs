import { useParams } from "react-router-dom";
import blogs from "../data/one.ts";
import Navbar from "./navbar";
import Footer from "./footer";

export default function BlogPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            By <span className="font-medium">{blog.author}</span> · {blog.date}
          </p>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.summary}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
