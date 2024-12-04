import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Pet Haven</h1>
        <p>Your gateway to finding your new furry family member.</p>
      </header>

      <section className="home-sections">
        <div className="home-card">
          <h2>Adopt</h2>
          <p>Find your perfect companion from our collection of pets waiting for a forever home.</p>
          <button onClick={() => window.location.href = '/adopt'}>View Pets</button>
        </div>
        <div className="home-card">
          <h2>Learn</h2>
          <p>Discover resources on pet care, adoption processes, and more.</p>
          <button onClick={() => window.location.href = '/learn'}>Learn More</button>
        </div>
        <div className="home-card">
          <h2>Help</h2>
          <p>Support our mission by volunteering, fostering, or donating.</p>
          <button onClick={() => window.location.href = '/help'}>Get Involved</button>
        </div>
        <div className="home-card">
          <h2>About Us</h2>
          <p>Learn about our mission to connect loving homes with pets in need.</p>
          <button onClick={() => window.location.href = '/about'}>About Us</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
