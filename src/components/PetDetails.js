import React, { useState, useEffect } from 'react';
import Map from './Map';
import './PetDetails.css';

const PetDetails = ({ match }) => {
  const { id } = match.params;
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/pet/${id}`)
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) => console.error('Error fetching pet details:', error));
  }, [id]);

  if (!pet) return <p>Loading pet details...</p>;

  return (
    <div className="pet-details">
      <h1>{pet.name}</h1>
      <img src={pet.photo} alt={pet.name} />
      <p>{pet.description}</p>
      <Map location={pet.location} />
    </div>
  );
};

export default PetDetails;
