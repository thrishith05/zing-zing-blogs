import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/homepage";
import AboutPage from "./components/aboutpage";
import SignupPage from "./components/signuppage";
import LoginPage from "./components/loginpage";
import BlogsPage from "./components/blogspage";
import BlogPage from "./components/blogpage";
import MyBlogsPage from "./components/myblogspage";
import EditPage from "./components/editpage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage></AboutPage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/blogs" element={<BlogsPage></BlogsPage>} />
        <Route path="/blog/:id" element={<BlogPage></BlogPage>} />
        <Route path="/myblog/:id" element={<MyBlogsPage></MyBlogsPage>} />
        <Route path="/edit/:id" element={<EditPage></EditPage>} />
      </Routes>
    </Router>
  );
}

export default App;
