import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Footer from "./footer";
import NavbarSignedup from "./navbarsignedup.tsx";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Blog {
  id: string;
  title: string;
  date: string;
  content: string;
  summary: string;
  userid: string;
}

export default function MyBlogsPage() {
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (!storedID) return;
    setCurrentUserID(storedID);

    axios
      .get(`http://localhost:3000/api/v1/blog/user/${storedID}`)
      .then((res) => {
        const blogsFromBackend = res.data.map((blog: any) => ({
          id: blog.blogid.toString(),
          title: blog.title,
          date: blog.date,
          content: blog.content,
          summary: blog.content.slice(0, 200) + "...",
          userid: blog.userid,
        }));
        setMyBlogs(blogsFromBackend);
      })
      .catch((err) => {
        console.error("Error fetching user blogs:", err);
      });
  }, []);

  const handleDelete = async (blogId: string) => {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("You're not logged in!");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3000/api/v1/blog/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMyBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog. Please check your login session.");
    }
  };
  

  return (
    <>
      <NavbarSignedup user={currentUserID} />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex flex-col justify-between">
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8">My Blogs</h1>
          {myBlogs.length > 0 ? (
            myBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4">{blog.date}</p>
                <p className="text-gray-700">{blog.summary}</p>
                <div className="flex flex-wrap gap-10 mt-4 justify-center">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Read More
                  </Link>
                  <Link
                    to={`/edit/${blog.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You haven't published any blogs yet.</p>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}
