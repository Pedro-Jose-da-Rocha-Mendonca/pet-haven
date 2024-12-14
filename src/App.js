import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/navbar/Navbar';
import Adopt from './components/pages/adopt/Adopt';
import Learn from './components/pages/learn/Learn';
import Help from './components/pages/help/Help';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Contact from './components/pages/contact/Contact';
import Profile from './components/pages/profile/Profile';
import { AuthProvider } from './services/AuthContext';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
