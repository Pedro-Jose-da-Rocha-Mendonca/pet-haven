import React from 'react';
import './Learn.css';

const Learn = () => {
  return (
    <div className="learn-page">
      <h1>Learn About Pet Adoption</h1>
      <div className="learn-content">
        <section className="learn-section">
          <h2>Before You Adopt</h2>
          <div className="info-box">
            <h3>Essential Considerations</h3>
            <ul>
              <li>Financial responsibility (food, vet care, supplies)</li>
              <li>Time commitment for exercise and attention</li>
              <li>Living space requirements</li>
              <li>Pet policies if you rent</li>
              <li>Family member allergies or preferences</li>
            </ul>
          </div>
        </section>

        <section className="learn-section">
          <h2>The Adoption Process</h2>
          <div className="info-box">
            <h3>What to Expect</h3>
            <ol>
              <li>Application submission and screening</li>
              <li>Meet and greet with the pet</li>
              <li>Home environment assessment</li>
              <li>Adoption fee payment</li>
              <li>Finalizing paperwork</li>
            </ol>
          </div>
        </section>

        <section className="learn-section">
          <h2>First-Time Pet Owner Tips</h2>
          <div className="info-box">
            <h3>Getting Started</h3>
            <ul>
              <li>Pet-proof your home</li>
              <li>Find a reliable veterinarian</li>
              <li>Stock up on essential supplies</li>
              <li>Create a feeding and exercise schedule</li>
              <li>Consider pet insurance</li>
            </ul>
          </div>
        </section>

        <section className="learn-section">
          <h2>Additional Resources</h2>
          <div className="info-box">
            <p>For more detailed information about pet care and adoption, visit:</p>
            <ul className="resources-list">
              <li><a href="https://www.aspca.org">ASPCA</a></li>
              <li><a href="https://www.humanesociety.org">The Humane Society</a></li>
              <li><a href="https://www.petfinder.com">Petfinder</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Learn;
