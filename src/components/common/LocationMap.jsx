import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { geocodeLocation } from '../../services/geocodingProxy';
import { FaMapMarkerAlt, FaSearchLocation, FaMapPin } from 'react-icons/fa';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle map clicks and update marker position
const MapClickHandler = ({ onMapClick, readOnly }) => {
  useMapEvents({
    click: (e) => {
      if (!readOnly) {
        onMapClick(e);
      }
    },
  });
  return null;
};

const LocationMap = ({ location, readOnly = false, onLocationSelect = null }) => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [locationName, setLocationName] = useState(location || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPinMode, setIsPinMode] = useState(false);
  const mapRef = useRef(null);

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

  // Toggle pin mode
  const togglePinMode = () => {
    setIsPinMode(!isPinMode);
    if (!isPinMode) {
      // When entering pin mode, show a message to the user
      setError('Click anywhere on the map to set your location');
    } else {
      setError(null);
    }
  };

  // Handle map click for selecting location (only in edit mode)
  const handleMapClick = (e) => {
    if (readOnly) return;

    const newCoordinates = [e.latlng.lat, e.latlng.lng];
    setCoordinates(newCoordinates);

    // Reverse geocode to get location name
    const reverseGeocode = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );
        const data = await response.json();

        let newLocationName = '';
        if (data && data.display_name) {
          newLocationName = data.display_name;
          setLocationName(newLocationName);
        } else {
          newLocationName = `Custom Location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`;
          setLocationName(newLocationName);
        }

        // Call the callback if provided
        if (onLocationSelect) {
          onLocationSelect({
            display_name: newLocationName,
            lat: e.latlng.lat,
            lon: e.latlng.lng
          });
        }

        // Exit pin mode after selection
        setIsPinMode(false);
        setError(null);
      } catch (err) {
        console.error('Reverse geocoding error:', err);
        // Even if reverse geocoding fails, still set coordinates
        const fallbackName = `Custom Location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`;
        setLocationName(fallbackName);

        if (onLocationSelect) {
          onLocationSelect({
            display_name: fallbackName,
            lat: e.latlng.lat,
            lon: e.latlng.lng
          });
        }

        setIsPinMode(false);
        setError(null);
      }
    };

    reverseGeocode();
  };

  // Center map on a specific location
  const centerMap = (lat, lng, zoom = 10) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom);
    }
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
    <div className="rounded-lg overflow-hidden shadow-md">
      {/* Map controls */}
      {!readOnly && (
        <div className="bg-white p-2 border-b flex justify-between items-center">
          <div className="text-sm font-medium text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-red-500" />
            {isPinMode ? 'Click on the map to set location' : 'Location Map'}
          </div>
          <button
            onClick={togglePinMode}
            className={`px-3 py-1 rounded text-sm flex items-center ${
              isPinMode ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}
          >
            {isPinMode ? (
              <>
                <FaMapPin className="mr-1" /> Cancel
              </>
            ) : (
              <>
                <FaSearchLocation className="mr-1" /> Pin on Map
              </>
            )}
          </button>
        </div>
      )}

      <div className="h-64">
        {!isLoading && coordinates[0] !== 0 && coordinates[1] !== 0 ? (
          <MapContainer
            center={coordinates}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates}>
              <Popup>{locationName}</Popup>
            </Marker>
            <MapClickHandler onMapClick={handleMapClick} readOnly={readOnly && !isPinMode} />
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-2"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            ) : (
              <div className="text-center p-4">
                {error ? (
                  <p className={`${isPinMode ? 'text-blue-600' : 'text-gray-600'}`}>{error}</p>
                ) : (
                  <p className="text-gray-600">{`Map for ${location}`}</p>
                )}
                {!readOnly && !isPinMode && !coordinates[0] && !coordinates[1] && (
                  <button
                    onClick={togglePinMode}
                    className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center mx-auto"
                  >
                    <FaSearchLocation className="mr-1" /> Pin on Map
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location info */}
      {coordinates[0] !== 0 && coordinates[1] !== 0 && (
        <div className="bg-gray-50 p-2 border-t text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Lat: {coordinates[0].toFixed(4)}</span>
            <span>Lng: {coordinates[1].toFixed(4)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
