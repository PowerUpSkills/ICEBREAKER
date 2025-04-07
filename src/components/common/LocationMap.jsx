import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { geocodeLocation } from '../../services/geocodingProxy';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMap = ({ location, readOnly = false }) => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [locationName, setLocationName] = useState(location || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Geocode the location to get coordinates
  useEffect(() => {
    if (!location) return;

    // Simple function to fetch coordinates without delays or complex logic
    const fetchCoordinates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use our proxy service to avoid CORS issues
        const result = await geocodeLocation(location);

        if (result) {
          setCoordinates([result.lat, result.lon]);
          setLocationName(result.display_name);
        } else {
          setError('Location not found. Please try a different search term.');
        }
      } catch (err) {
        setError('Error geocoding location. Please try again.');
        console.error('Geocoding error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [location]);

  // Handle map click for selecting location (only in edit mode)
  const handleMapClick = (e) => {
    if (readOnly) return;

    setCoordinates([e.latlng.lat, e.latlng.lng]);

    // Reverse geocode to get location name
    const reverseGeocode = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );
        const data = await response.json();

        if (data && data.display_name) {
          setLocationName(data.display_name);
        }
      } catch (err) {
        console.error('Reverse geocoding error:', err);
      }
    };

    reverseGeocode();
  };

  if (isLoading) {
    return (
      <div className="h-64 rounded-lg overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 rounded-lg overflow-hidden shadow-md bg-red-50 flex items-center justify-center">
        <p className="text-red-500 text-center px-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden shadow-md">
      {!isLoading && coordinates[0] !== 0 && coordinates[1] !== 0 ? (
        <MapContainer
          center={coordinates}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          onClick={handleMapClick}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>{locationName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          ) : (
            <p className="text-gray-600 p-4 text-center">{error || `Map for ${location}`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
