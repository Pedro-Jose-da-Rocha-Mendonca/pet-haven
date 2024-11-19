import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Adopt from './components/Adopt';
import Learn from './components/Learn';
import Help from './components/Help';
import Navbar from './components/Navbar';
import PetDetails from './components/PetDetails';

function App() {
  return (
    <Router basename="/app">
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="adopt" element={<Adopt />} />
          <Route path="learn" element={<Learn />} />
          <Route path="help" element={<Help />} />
          <Route path="pet/:id" element={<PetDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
