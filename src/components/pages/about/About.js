import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>Our Team</h1>
      <div className="team-grid">
        <div className="team-member">
          <h2>Pedro Mendonca</h2>
          <p className="role">Founder</p>
          <p>Full-stack developer with expertise in React and database management. Leading the technical architecture of Pet Haven.</p>
        </div>
        <div className="team-member">
          <h2>David Lin</h2>
          <p className="role">Founder</p>
          <p>UI/UX specialist focused on creating intuitive user experiences. Brings creative solutions to front-end development.</p>
        </div>
        <div className="team-member">
          <h2>Fadel Muzahdi</h2>
          <p className="role">Founder</p>
          <p>Backend developer with strong problem-solving skills. Specializes in API integration and server optimization.</p>
        </div>
        <div className="team-member">
          <h2>Fatima Castillo</h2>
          <p className="role">Founder</p>
          <p>Quality assurance expert ensuring smooth user experience. Leads the testing and documentation efforts.</p>
        </div>
        <div className="team-member">
          <h2>Rheymar Devera</h2>
          <p className="role">Founder</p>
          <p>Frontend developer with a keen eye for design. Focuses on responsive design and cross-browser compatibility.</p>
        </div>
      </div>
    </div>
  );
};

export default About;