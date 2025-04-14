import React, { useState, useEffect, useRef } from 'react';
import { getSuggestedLocations, getAvailableCountries } from '../../services/geocodingProxy';
import { FaSearch, FaMapMarkerAlt, FaGlobeEurope, FaFlag, FaInfoCircle, FaMapMarked } from 'react-icons/fa';
import LocationMap from './LocationMap';

const LocationAutocomplete = ({ value, onChange, placeholder, className }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [noResults, setNoResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [showPostalCodeInfo, setShowPostalCodeInfo] = useState(false);
  const [showMapSelector, setShowMapSelector] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const countryRef = useRef(null);

  // Update input value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Load available countries
  useEffect(() => {
    const availableCountries = getAvailableCountries();
    setCountries(availableCountries);
  }, []);

  // Handle clicks outside the component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setNoResults(false);

    // Check if it might be a postal code
    const isPostalCodeFormat = /^\d{5}(-\d{4})?$/.test(newValue) || // US format
                             /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(newValue) || // Canadian format
                             /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/.test(newValue); // UK format

    setShowPostalCodeInfo(isPostalCodeFormat);

    // Only search if we have at least 2 characters
    if (newValue.length >= 2) {
      const results = getSuggestedLocations(newValue, selectedCountry || null);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setNoResults(results.length === 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setNoResults(false);
    }

    // Call the onChange prop with the new value
    if (onChange) {
      onChange(newValue);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedLocation(suggestion);

    // Call the onChange prop with the selected suggestion
    if (onChange) {
      onChange(suggestion.display_name);
    }
  };

  // Handle location selection from map
  const handleMapLocationSelect = (location) => {
    if (location && location.display_name) {
      setInputValue(location.display_name);
      setSelectedLocation(location);

      // Call the onChange prop with the selected location
      if (onChange) {
        onChange(location.display_name);
      }

      // Hide the map selector after selection
      setShowMapSelector(false);
    }
  };

  // Toggle map selector
  const toggleMapSelector = () => {
    setShowMapSelector(!showMapSelector);
    if (showMapSelector) {
      // When closing the map, reset any error states
      setNoResults(false);
    }
  };

  // Handle country selection
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // Update suggestions based on new country filter
    if (inputValue.length >= 2) {
      const results = getSuggestedLocations(inputValue, country || null);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setNoResults(results.length === 0);
    }
  };

  // Toggle country selector
  const toggleCountrySelector = () => {
    setShowCountrySelector(!showCountrySelector);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter
    else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[highlightedIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      {/* Control buttons */}
      <div className="flex items-center mb-2 justify-between">
        <button
          type="button"
          onClick={toggleCountrySelector}
          className="flex items-center text-sm text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          <FaFlag className="mr-1" />
          {selectedCountry ? `Filtering by: ${selectedCountry}` : 'Filter by country (optional)'}
          <span className="ml-1 text-xs">{showCountrySelector ? '▲' : '▼'}</span>
        </button>

        <button
          type="button"
          onClick={toggleMapSelector}
          className={`flex items-center text-sm ${showMapSelector ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'} focus:outline-none`}
        >
          <FaMapMarked className="mr-1" />
          {showMapSelector ? 'Hide Map' : 'Select on Map'}
        </button>
      </div>

      {/* Country dropdown */}
      {showCountrySelector && (
        <div className="mb-3">
          <select
            ref={countryRef}
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- All Countries --</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <FaSearch />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (inputValue.length >= 2 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow clicking on them
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Enter a location or postal code"}
          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className || ''}`}
          autoComplete="off"
        />
      </div>

      {/* Postal code info */}
      {showPostalCodeInfo && (
        <div className="mt-1 text-sm text-indigo-600 flex items-center bg-indigo-50 p-2 rounded">
          <FaInfoCircle className="mr-1" />
          <span>Postal code detected. You can select a country above for better accuracy.</span>
        </div>
      )}

      {/* Helper text */}
      {isFocused && !showSuggestions && !noResults && inputValue.length < 2 && (
        <div className="mt-1 text-sm text-gray-600 flex items-center">
          <FaGlobeEurope className="mr-1" />
          <span>Type at least 2 characters to search. You can enter city names in English or German, or postal codes.</span>
        </div>
      )}

      {/* No results message */}
      {noResults && inputValue.length >= 2 && !showMapSelector && (
        <div className="mt-1 text-sm text-gray-600">
          <p className="flex items-center"><FaMapMarkerAlt className="mr-1" /> No exact matches found. Try:</p>
          <ul className="ml-6 mt-1 list-disc text-gray-500">
            <li>Using English or German city names (e.g., "Köln" or "Cologne")</li>
            <li>Using a postal code (e.g., "10115" for Berlin)</li>
            <li>Selecting a country from the dropdown above</li>
            <li>Checking for typos</li>
            <li>Using a more common city name</li>
          </ul>
          <button
            onClick={toggleMapSelector}
            className="mt-2 w-full py-2 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center"
          >
            <FaMapMarked className="mr-2" /> Select Location Directly on Map
          </button>
          <p className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded">
            <FaInfoCircle className="inline mr-1" />
            Don't worry! Even if your location isn't found exactly, the system will use the closest match or a default location.
          </p>
        </div>
      )}

      {/* Map selector */}
      {showMapSelector && (
        <div className="mt-3 mb-3">
          <LocationMap
            location={inputValue}
            readOnly={false}
            onLocationSelect={handleMapLocationSelect}
          />
          <p className="mt-2 text-xs text-gray-600">
            <FaInfoCircle className="inline mr-1" />
            Click anywhere on the map to select that location. The address will be automatically determined.
          </p>
        </div>
      )}

      {/* Suggestions list */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => {
            // Determine badge style based on confidence level
            let badgeText = '';
            let badgeClass = '';

            if (suggestion.confidence === 'exact' || suggestion.matchType === 'exact') {
              badgeText = 'Exact Match';
              badgeClass = 'bg-green-100 text-green-800';
            } else if (suggestion.confidence === 'high') {
              badgeText = 'High Confidence';
              badgeClass = 'bg-green-100 text-green-800';
            } else if (suggestion.confidence === 'medium') {
              badgeText = 'Medium Confidence';
              badgeClass = 'bg-blue-100 text-blue-800';
            } else if (suggestion.confidence === 'low') {
              badgeText = 'Low Confidence';
              badgeClass = 'bg-yellow-100 text-yellow-800';
            } else if (suggestion.confidence === 'country-only') {
              badgeText = 'Country Match';
              badgeClass = 'bg-orange-100 text-orange-800';
            } else if (suggestion.confidence === 'unknown') {
              badgeText = 'Best Guess';
              badgeClass = 'bg-red-100 text-red-800';
            }

            // Override for special types
            if (suggestion.isPostalCode) {
              badgeText = 'Postal Code';
              badgeClass = 'bg-indigo-100 text-indigo-800';
            }

            // Determine item style based on match type
            let itemClass = '';
            if (suggestion.matchType === 'exact' || suggestion.confidence === 'exact') {
              itemClass = 'font-medium';
            } else if (suggestion.matchType === 'fuzzy' && suggestion.confidence === 'high') {
              itemClass = 'font-medium';
            } else if (suggestion.matchType === 'default-fallback' || suggestion.isGeneric) {
              itemClass = 'italic text-gray-600';
            }

            return (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                  index === highlightedIndex ? 'bg-indigo-50' : ''
                } ${itemClass}`}
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  <div>
                    <div>{suggestion.display_name}</div>
                    {suggestion.similarityScore && (
                      <div className="text-xs text-gray-500">
                        Match score: {Math.round(suggestion.similarityScore * 100)}%
                      </div>
                    )}
                  </div>
                </div>
                {badgeText && (
                  <span className={`ml-2 text-xs ${badgeClass} px-2 py-1 rounded whitespace-nowrap`}>
                    {badgeText}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
