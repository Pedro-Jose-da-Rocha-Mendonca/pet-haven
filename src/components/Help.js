import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <h1>Ways You Can Help</h1>
      <div className="help-options">
        <div className="help-card">
          <h3>Donate</h3>
          <p>Your donations help us provide food, shelter, and medical care to pets in need.</p>
          <button onClick={() => window.open('https://donation-link.example', '_blank')}>Donate Now</button>
        </div>
        <div className="help-card">
          <h3>Volunteer</h3>
          <p>Join us as a volunteer and make a direct impact by helping animals.</p>
          <button onClick={() => window.open('https://volunteer-link.example', '_blank')}>Sign Up</button>
        </div>
        <div className="help-card">
          <h3>Foster</h3>
          <p>Provide a temporary home for pets in need until they find their forever homes.</p>
          <button onClick={() => window.open('https://foster-link.example', '_blank')}>Become a Foster</button>
        </div>
      </div>
    </div>
  );
};

export default Help;
