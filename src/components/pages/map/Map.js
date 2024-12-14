import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useAuth } from '../../../services/AuthContext';
import './Map.css';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ centers, onMarkerClick }) => {
  const { currentUser, toggleFavorite } = useAuth();
  const mapInstanceRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = () => {
      try {
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(mapInstanceRef.current);

          setIsMapReady(true);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

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
        const isFavorite = currentUser?.favorites?.some(fav => fav.id === center.id);
        const favoriteButtonHtml = currentUser ? 
          `<button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-center-id="${center.id}">
            ${isFavorite ? '❤️' : '🤍'}
          </button>` : '';

        const popupContent = `
          <div class="center-popup">
            <div class="popup-header">
              <h3>${center.name}</h3>
              ${favoriteButtonHtml}
            </div>
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

        marker.on('popupopen', () => {
          const favoriteBtn = document.querySelector(`.favorite-btn[data-center-id="${center.id}"]`);
          if (favoriteBtn) {
            favoriteBtn.addEventListener('click', async () => {
              try {
                const newIsFavorite = !currentUser.favorites.some(fav => fav.id === center.id);
                await toggleFavorite(center);
                
                favoriteBtn.innerHTML = newIsFavorite ? '❤️' : '🤍';
                favoriteBtn.classList.toggle('favorited', newIsFavorite);
              } catch (error) {
                console.error('Error toggling favorite:', error.message);
                alert('Failed to update favorite. Please try again.');
              }
            });
          }
        });
        
        markersRef.current.push(marker);
      });

      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [centers, currentUser?.favorites, toggleFavorite, currentUser, isMapReady]);

  useEffect(() => {
    return () => {
      delete window.handleMarkerClick;
      delete window.handleFavoriteClick;
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      {!isMapReady && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 1000 
        }}>
          Loading map...
        </div>
      )}
      <div 
        ref={mapContainerRef}
        id="map" 
        style={{ 
          width: '100%', 
          height: '100%',
          visibility: isMapReady ? 'visible' : 'hidden'
        }} 
      />
    </div>
  );
};

export default Map;
