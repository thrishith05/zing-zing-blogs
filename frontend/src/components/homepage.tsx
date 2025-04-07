import Footer from "./footer";

export default function HomePage() {
    const blogs = [
      {
        title: "How to Build a Blog App with React & Tailwind",
        excerpt:
          "In this post, we’ll explore how to build a full-stack blog using React, TailwindCSS, and more...",
      },
      {
        title: "10 Tips for Writing Cleaner JavaScript",
        excerpt:
          "Code is like humor. When you have to explain it, it’s bad. Here’s how to keep it clean and readable...",
      },
      {
        title: "Understanding React Hooks: A Deep Dive",
        excerpt:
          "Let’s explore useState, useEffect, and custom hooks with real-world examples and caveats...",
      },
    ];
  
    const authors = [
      {
        name: "Alice Johnson",
        bio: "Frontend Dev & UI/UX wizard ✨",
      },
      {
        name: "Mark Tran",
        bio: "Backend ninja and DevOps geek 💻",
      },
      {
        name: "Sara Lopez",
        bio: "Full-stack storyteller with a love for clean code 🌈",
      },
    ];
  
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ZingZing Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the new blogs by <strong>Backend Bd Bhai 🚬</strong>
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition">
            Start Reading
          </button>
        </section>
  
        {/* Blog Posts Preview */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Hot Topics</h2>
  
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">{blog.title}</h3>
                <p className="text-gray-700">{blog.excerpt}</p>
                <button className="mt-4 text-sm text-purple-600 font-semibold hover:underline">
                  Read more →
                </button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Featured Creators */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-50 py-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Featured Creators
          </h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {authors.map((author, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-xl font-semibold text-indigo-600 mb-2">{author.name}</div>
                <p className="text-gray-700 text-sm">{author.bio}</p>
              </div>
            ))}
          </div>
        </section>

  
        {/* Footer */}
        {/* <footer className="bg-gray-800 text-white text-center py-6">
          <p>© {new Date().getFullYear()} ZingZing Blog. Built with ❤️ and React.</p>
        </footer> */}
        <Footer></Footer>
      </div>
    );
  }
  