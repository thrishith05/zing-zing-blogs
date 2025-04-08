import { useParams, Link } from "react-router-dom";
import Footer from "./footer";
import blogs from "../data/one.ts";
import NavbarSignedup from "./navbarsignedup.tsx";
import usersData from "../data/two.ts";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function MyBlogsPage() {
  const { id } = useParams();
  const currentUser: User | undefined = usersData.find((u) => u.id === id);
  const myBlogs = blogs.filter((blog) => blog.authorid === currentUser?.id);

  return (
    <>
      <NavbarSignedup user={currentUser} />
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
                <div className="flex flex-wrap gap-10  mt-4 justify-center">
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

  // Dummy handler for now (you can later implement real deletion logic)
  function handleDelete(id: string) {
    alert(`Delete blog with id: ${id}`);
    // TODO: Add actual delete logic
  }
}
