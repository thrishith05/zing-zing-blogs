import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavbarSignedup from "./navbarsignedup.tsx";

interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  userid: string;
}

export default function EditPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/blog/${id}`);
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to update the blog.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/blog/update/${id}`,
        {
          title,
          content,
          tag: "updated", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully!");
      navigate(`/myblog/${res.data.blog.userid}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog. Check your login or permissions.");
    }
  };

  return (
    <>
      <NavbarSignedup user={localStorage.getItem("userID")} />
      <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Edit Blog</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
}
