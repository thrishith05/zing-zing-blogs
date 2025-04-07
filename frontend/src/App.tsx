import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar';
import HomePage from './components/homepage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Navbar/>} />
        <Route path="/signup" />
        <Route path="/login" />
      </Routes>
    </Router>
  );
}

export default App;
