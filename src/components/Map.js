import React, { useEffect } from 'react';
import L from 'leaflet';
import './Map.css';

const Map = ({ location }) => {
  useEffect(() => {
    const map = L.map('map').setView([location.lat, location.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([location.lat, location.lng]).addTo(map)
      .bindPopup('Pet Location')
      .openPopup();

    return () => {
      map.remove();
    };
  }, [location]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default Map;
