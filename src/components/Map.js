import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ centers, onMarkerClick }) => {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map('map').setView([39.8283, -98.5795], 4);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const validCenters = centers.filter(center => 
      center.location && 
      !isNaN(center.location.lat) && 
      !isNaN(center.location.lng)
    );

    if (validCenters.length > 0) {
      const bounds = L.latLngBounds(validCenters.map(center => 
        [center.location.lat, center.location.lng]
      ));

      validCenters.forEach(center => {
        const popupContent = `
          <div class="center-popup">
            <h3>${center.name}</h3>
            <p><strong>Location:</strong> ${center.citystate || ''}</p>
            ${center.email ? `<p><strong>Email:</strong> ${center.email}</p>` : ''}
            ${center.phone ? `<p><strong>Phone:</strong> ${center.phone}</p>` : ''}
            ${center.website ? `<p><strong>Website:</strong> <a href="${center.website}" target="_blank">${center.website}</a></p>` : ''}
          </div>
        `;

        const marker = L.marker([center.location.lat, center.location.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 200
          });
        
        markersRef.current.push(marker);
      });

      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [centers]);

  useEffect(() => {
    window.handleMarkerClick = (centerId) => {
      const center = centers.find(c => c.id === centerId);
      if (center && onMarkerClick) {
        onMarkerClick(center);
      }
    };

    return () => {
      delete window.handleMarkerClick;
    };
  }, [centers, onMarkerClick]);

  return <div id="map"></div>;
};

export default Map;
