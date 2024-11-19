import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Adopt.css';

const Adopt = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('/api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="adopt-page">
      <h1>Available Pets for Adoption</h1>
      <div className="pets-grid">
        {pets.map((pet) => (
          <Link to={`/pet/${pet.id}`} key={pet.id} className="pet-card">
            <img src={pet.photo} alt={pet.name} />
            <h3>{pet.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Adopt;
