import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarSignedup from "./navbarsignedup.tsx";
import Footer from "./footer";


const currentUser = { id: 12, username: "John Doe" }; 

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else if (response.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-gray-500">Loading blog...</h2>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <NavbarSignedup user={currentUser} />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            By <span className="font-medium">{blog.userid}</span> · {blog.date}
          </p>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
