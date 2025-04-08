import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import blogs from "../data/one.ts"; // This is assumed to be a local array of blog data
import NavbarSignedup from "./navbarsignedup.tsx";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === id);

  const [title, setTitle] = useState(blog?.title || "");
  const [summary, setSummary] = useState(blog?.summary || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    
    alert(`Updated Blog:\nTitle: ${title}\nSummary: ${summary}`);


    navigate(`/myblog/${blog?.authorid}`);
  };

  if (!blog) {
    return <div className="p-10 text-red-500 font-semibold">Blog not found.</div>;
  }

  return (
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
          <label className="block font-medium mb-2">Summary</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
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
  );
}
