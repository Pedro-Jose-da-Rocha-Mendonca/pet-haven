import React, { useState, useEffect } from 'react';
import { searchAdoptionCenters } from '../services/petApi';
import Map from './Map';
import './Adopt.css';

const Adopt = () => {
  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchAdoptionCenters();
        setCenters(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching centers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCenters();
  }, []);

  return (
    <div className="adopt-page">
      <h1>Find Adoption Centers Near You</h1>
      <p className="adopt-description">
        Click on any marker to see detailed information about the adoption center.
      </p>
      
      {isLoading && <div className="loading">Loading adoption centers...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      
      {!isLoading && !error && centers.length === 0 && (
        <div className="no-results">No adoption centers found</div>
      )}
      
      {centers.length > 0 && (
        <div className="map-container">
          <Map centers={centers} />
        </div>
      )}
    </div>
  );
};

export default Adopt;
