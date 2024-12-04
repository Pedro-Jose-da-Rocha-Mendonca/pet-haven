import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Adopt from './components/Adopt';
import Learn from './components/Learn';
import Help from './components/Help';
import Home from './components/Home';
import About from './components/About';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adopt" element={<Adopt />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
);

export default App;
