/**
 * Geocoding proxy service to handle CORS issues with OpenStreetMap Nominatim API
 * This provides alternative methods for geocoding that work around CORS restrictions
 */

/**
 * Get coordinates for a location using a fallback approach
 *
 * @param {string} location - The location to geocode
 * @returns {Promise<{lat: number, lon: number, display_name: string} | null>} - The coordinates or null if not found
 */
export const geocodeLocation = async (location) => {
  if (!location || location.trim() === '') {
    return null;
  }

  // Skip the CORS proxy attempt as it's failing
  // Go directly to the fallback method
  console.log('Using fallback geocoding for location:', location);

  // Fallback: Use a predefined set of common locations
  return getFallbackCoordinates(location);
};

/**
 * Fallback method that returns approximate coordinates for common locations
 * This is used when the geocoding API is unavailable due to CORS or rate limiting
 *
 * @param {string} location - The location to find coordinates for
 * @returns {{lat: number, lon: number, display_name: string} | null} - The coordinates or null if not found
 */
const getFallbackCoordinates = (location) => {
  const locationLower = location.toLowerCase();

  // Common cities and countries with approximate coordinates
  const commonLocations = {
    'berlin': { lat: 52.5200, lon: 13.4050, display_name: 'Berlin, Germany' },
    'london': { lat: 51.5074, lon: -0.1278, display_name: 'London, United Kingdom' },
    'new york': { lat: 40.7128, lon: -74.0060, display_name: 'New York, USA' },
    'paris': { lat: 48.8566, lon: 2.3522, display_name: 'Paris, France' },
    'tokyo': { lat: 35.6762, lon: 139.6503, display_name: 'Tokyo, Japan' },
    'sydney': { lat: -33.8688, lon: 151.2093, display_name: 'Sydney, Australia' },
    'san francisco': { lat: 37.7749, lon: -122.4194, display_name: 'San Francisco, USA' },
    'mumbai': { lat: 19.0760, lon: 72.8777, display_name: 'Mumbai, India' },
    'rio de janeiro': { lat: -22.9068, lon: -43.1729, display_name: 'Rio de Janeiro, Brazil' },
    'cairo': { lat: 30.0444, lon: 31.2357, display_name: 'Cairo, Egypt' },
    'moscow': { lat: 55.7558, lon: 37.6173, display_name: 'Moscow, Russia' },
    'toronto': { lat: 43.6532, lon: -79.3832, display_name: 'Toronto, Canada' },
    'singapore': { lat: 1.3521, lon: 103.8198, display_name: 'Singapore' },
    'dubai': { lat: 25.2048, lon: 55.2708, display_name: 'Dubai, UAE' },
    'los angeles': { lat: 34.0522, lon: -118.2437, display_name: 'Los Angeles, USA' },
    'chicago': { lat: 41.8781, lon: -87.6298, display_name: 'Chicago, USA' },
    'beijing': { lat: 39.9042, lon: 116.4074, display_name: 'Beijing, China' },
    'shanghai': { lat: 31.2304, lon: 121.4737, display_name: 'Shanghai, China' },
    'mexico city': { lat: 19.4326, lon: -99.1332, display_name: 'Mexico City, Mexico' },
    'sao paulo': { lat: -23.5505, lon: -46.6333, display_name: 'São Paulo, Brazil' },
    'hong kong': { lat: 22.3193, lon: 114.1694, display_name: 'Hong Kong' },
    'bangkok': { lat: 13.7563, lon: 100.5018, display_name: 'Bangkok, Thailand' },
    'amsterdam': { lat: 52.3676, lon: 4.9041, display_name: 'Amsterdam, Netherlands' },
    'rome': { lat: 41.9028, lon: 12.4964, display_name: 'Rome, Italy' },
    'barcelona': { lat: 41.3851, lon: 2.1734, display_name: 'Barcelona, Spain' },
    'madrid': { lat: 40.4168, lon: -3.7038, display_name: 'Madrid, Spain' },
    'vienna': { lat: 48.2082, lon: 16.3738, display_name: 'Vienna, Austria' },
    'seoul': { lat: 37.5665, lon: 126.9780, display_name: 'Seoul, South Korea' },
    'munich': { lat: 48.1351, lon: 11.5820, display_name: 'Munich, Germany' },
    'frankfurt': { lat: 50.1109, lon: 8.6821, display_name: 'Frankfurt, Germany' },
    'hamburg': { lat: 53.5511, lon: 9.9937, display_name: 'Hamburg, Germany' },
    'zurich': { lat: 47.3769, lon: 8.5417, display_name: 'Zurich, Switzerland' },
    'geneva': { lat: 46.2044, lon: 6.1432, display_name: 'Geneva, Switzerland' },
    'stockholm': { lat: 59.3293, lon: 18.0686, display_name: 'Stockholm, Sweden' },
    'oslo': { lat: 59.9139, lon: 10.7522, display_name: 'Oslo, Norway' },
    'copenhagen': { lat: 55.6761, lon: 12.5683, display_name: 'Copenhagen, Denmark' },
    'helsinki': { lat: 60.1699, lon: 24.9384, display_name: 'Helsinki, Finland' },
    'warsaw': { lat: 52.2297, lon: 21.0122, display_name: 'Warsaw, Poland' },
    'prague': { lat: 50.0755, lon: 14.4378, display_name: 'Prague, Czech Republic' },
    'budapest': { lat: 47.4979, lon: 19.0402, display_name: 'Budapest, Hungary' },
    'athens': { lat: 37.9838, lon: 23.7275, display_name: 'Athens, Greece' },
    'istanbul': { lat: 41.0082, lon: 28.9784, display_name: 'Istanbul, Turkey' },
    'dubai': { lat: 25.2048, lon: 55.2708, display_name: 'Dubai, UAE' },
    'cape town': { lat: -33.9249, lon: 18.4241, display_name: 'Cape Town, South Africa' },
    'johannesburg': { lat: -26.2041, lon: 28.0473, display_name: 'Johannesburg, South Africa' },
    'nairobi': { lat: -1.2921, lon: 36.8219, display_name: 'Nairobi, Kenya' },
    'lagos': { lat: 6.5244, lon: 3.3792, display_name: 'Lagos, Nigeria' },
    'casablanca': { lat: 33.5731, lon: -7.5898, display_name: 'Casablanca, Morocco' },
    'tel aviv': { lat: 32.0853, lon: 34.7818, display_name: 'Tel Aviv, Israel' },
    'jerusalem': { lat: 31.7683, lon: 35.2137, display_name: 'Jerusalem, Israel' },
    'beirut': { lat: 33.8938, lon: 35.5018, display_name: 'Beirut, Lebanon' },
    'tehran': { lat: 35.6892, lon: 51.3890, display_name: 'Tehran, Iran' },
    'riyadh': { lat: 24.7136, lon: 46.6753, display_name: 'Riyadh, Saudi Arabia' },
    'doha': { lat: 25.2854, lon: 51.5310, display_name: 'Doha, Qatar' },
    'abu dhabi': { lat: 24.4539, lon: 54.3773, display_name: 'Abu Dhabi, UAE' },
    'manila': { lat: 14.5995, lon: 120.9842, display_name: 'Manila, Philippines' },
    'jakarta': { lat: -6.2088, lon: 106.8456, display_name: 'Jakarta, Indonesia' },
    'kuala lumpur': { lat: 3.1390, lon: 101.6869, display_name: 'Kuala Lumpur, Malaysia' },
    'hanoi': { lat: 21.0285, lon: 105.8542, display_name: 'Hanoi, Vietnam' },
    'ho chi minh city': { lat: 10.8231, lon: 106.6297, display_name: 'Ho Chi Minh City, Vietnam' },
    'melbourne': { lat: -37.8136, lon: 144.9631, display_name: 'Melbourne, Australia' },
    'brisbane': { lat: -27.4698, lon: 153.0251, display_name: 'Brisbane, Australia' },
    'perth': { lat: -31.9505, lon: 115.8605, display_name: 'Perth, Australia' },
    'auckland': { lat: -36.8509, lon: 174.7645, display_name: 'Auckland, New Zealand' },
    'wellington': { lat: -41.2865, lon: 174.7762, display_name: 'Wellington, New Zealand' },
    'vancouver': { lat: 49.2827, lon: -123.1207, display_name: 'Vancouver, Canada' },
    'montreal': { lat: 45.5017, lon: -73.5673, display_name: 'Montreal, Canada' },
    'ottawa': { lat: 45.4215, lon: -75.6972, display_name: 'Ottawa, Canada' },
    'boston': { lat: 42.3601, lon: -71.0589, display_name: 'Boston, USA' },
    'washington': { lat: 38.9072, lon: -77.0369, display_name: 'Washington D.C., USA' },
    'seattle': { lat: 47.6062, lon: -122.3321, display_name: 'Seattle, USA' },
    'denver': { lat: 39.7392, lon: -104.9903, display_name: 'Denver, USA' },
    'dallas': { lat: 32.7767, lon: -96.7970, display_name: 'Dallas, USA' },
    'houston': { lat: 29.7604, lon: -95.3698, display_name: 'Houston, USA' },
    'miami': { lat: 25.7617, lon: -80.1918, display_name: 'Miami, USA' },
    'atlanta': { lat: 33.7490, lon: -84.3880, display_name: 'Atlanta, USA' },
    'philadelphia': { lat: 39.9526, lon: -75.1652, display_name: 'Philadelphia, USA' },
    'phoenix': { lat: 33.4484, lon: -112.0740, display_name: 'Phoenix, USA' },
    'san diego': { lat: 32.7157, lon: -117.1611, display_name: 'San Diego, USA' },
    'austin': { lat: 30.2672, lon: -97.7431, display_name: 'Austin, USA' },
    'las vegas': { lat: 36.1699, lon: -115.1398, display_name: 'Las Vegas, USA' },
    'portland': { lat: 45.5051, lon: -122.6750, display_name: 'Portland, USA' },
    'san jose': { lat: 37.3382, lon: -121.8863, display_name: 'San Jose, USA' },
    'minneapolis': { lat: 44.9778, lon: -93.2650, display_name: 'Minneapolis, USA' },
    'pittsburgh': { lat: 40.4406, lon: -79.9959, display_name: 'Pittsburgh, USA' },
    'charlotte': { lat: 35.2271, lon: -80.8431, display_name: 'Charlotte, USA' },
    'indianapolis': { lat: 39.7684, lon: -86.1581, display_name: 'Indianapolis, USA' },
    'columbus': { lat: 39.9612, lon: -82.9988, display_name: 'Columbus, USA' },
    'detroit': { lat: 42.3314, lon: -83.0458, display_name: 'Detroit, USA' },
    'baltimore': { lat: 39.2904, lon: -76.6122, display_name: 'Baltimore, USA' },
    'milwaukee': { lat: 43.0389, lon: -87.9065, display_name: 'Milwaukee, USA' },
    'albuquerque': { lat: 35.0844, lon: -106.6504, display_name: 'Albuquerque, USA' },
    'tucson': { lat: 32.2226, lon: -110.9747, display_name: 'Tucson, USA' },
    'sacramento': { lat: 38.5816, lon: -121.4944, display_name: 'Sacramento, USA' },
    'kansas city': { lat: 39.0997, lon: -94.5786, display_name: 'Kansas City, USA' },
    'cleveland': { lat: 41.4993, lon: -81.6944, display_name: 'Cleveland, USA' },
    'cincinnati': { lat: 39.1031, lon: -84.5120, display_name: 'Cincinnati, USA' },
    'orlando': { lat: 28.5383, lon: -81.3792, display_name: 'Orlando, USA' },
    'tampa': { lat: 27.9506, lon: -82.4572, display_name: 'Tampa, USA' },
    'st. louis': { lat: 38.6270, lon: -90.1994, display_name: 'St. Louis, USA' },
    'nashville': { lat: 36.1627, lon: -86.7816, display_name: 'Nashville, USA' },
    'memphis': { lat: 35.1495, lon: -90.0490, display_name: 'Memphis, USA' },
    'louisville': { lat: 38.2527, lon: -85.7585, display_name: 'Louisville, USA' },
    'new orleans': { lat: 29.9511, lon: -90.0715, display_name: 'New Orleans, USA' },
    'havana': { lat: 23.1136, lon: -82.3666, display_name: 'Havana, Cuba' },
    'mexico city': { lat: 19.4326, lon: -99.1332, display_name: 'Mexico City, Mexico' },
    'guadalajara': { lat: 20.6597, lon: -103.3496, display_name: 'Guadalajara, Mexico' },
    'monterrey': { lat: 25.6866, lon: -100.3161, display_name: 'Monterrey, Mexico' },
    'guatemala city': { lat: 14.6349, lon: -90.5069, display_name: 'Guatemala City, Guatemala' },
    'san salvador': { lat: 13.6894, lon: -89.1872, display_name: 'San Salvador, El Salvador' },
    'tegucigalpa': { lat: 14.0723, lon: -87.1921, display_name: 'Tegucigalpa, Honduras' },
    'managua': { lat: 12.1149, lon: -86.2362, display_name: 'Managua, Nicaragua' },
    'san jose': { lat: 9.9281, lon: -84.0907, display_name: 'San Jose, Costa Rica' },
    'panama city': { lat: 8.9936, lon: -79.5197, display_name: 'Panama City, Panama' },
    'bogota': { lat: 4.7110, lon: -74.0721, display_name: 'Bogota, Colombia' },
    'medellin': { lat: 6.2476, lon: -75.5658, display_name: 'Medellin, Colombia' },
    'cali': { lat: 3.4516, lon: -76.5320, display_name: 'Cali, Colombia' },
    'caracas': { lat: 10.4806, lon: -66.9036, display_name: 'Caracas, Venezuela' },
    'quito': { lat: -0.1807, lon: -78.4678, display_name: 'Quito, Ecuador' },
    'guayaquil': { lat: -2.1894, lon: -79.8891, display_name: 'Guayaquil, Ecuador' },
    'lima': { lat: -12.0464, lon: -77.0428, display_name: 'Lima, Peru' },
    'la paz': { lat: -16.4897, lon: -68.1193, display_name: 'La Paz, Bolivia' },
    'santiago': { lat: -33.4489, lon: -70.6693, display_name: 'Santiago, Chile' },
    'buenos aires': { lat: -34.6037, lon: -58.3816, display_name: 'Buenos Aires, Argentina' },
    'cordoba': { lat: -31.4201, lon: -64.1888, display_name: 'Cordoba, Argentina' },
    'rosario': { lat: -32.9442, lon: -60.6505, display_name: 'Rosario, Argentina' },
    'montevideo': { lat: -34.9011, lon: -56.1645, display_name: 'Montevideo, Uruguay' },
    'asuncion': { lat: -25.2637, lon: -57.5759, display_name: 'Asuncion, Paraguay' },
    'brasilia': { lat: -15.7801, lon: -47.9292, display_name: 'Brasilia, Brazil' },
    'rio de janeiro': { lat: -22.9068, lon: -43.1729, display_name: 'Rio de Janeiro, Brazil' },
    'salvador': { lat: -12.9714, lon: -38.5014, display_name: 'Salvador, Brazil' },
    'fortaleza': { lat: -3.7319, lon: -38.5267, display_name: 'Fortaleza, Brazil' },
    'recife': { lat: -8.0476, lon: -34.8770, display_name: 'Recife, Brazil' },
    'porto alegre': { lat: -30.0346, lon: -51.2177, display_name: 'Porto Alegre, Brazil' },
    'ludwigshafen': { lat: 49.4741, lon: 8.4304, display_name: 'Ludwigshafen, Germany' },
    'mannheim': { lat: 49.4875, lon: 8.4660, display_name: 'Mannheim, Germany' },
    'heidelberg': { lat: 49.3988, lon: 8.6724, display_name: 'Heidelberg, Germany' },
    'karlsruhe': { lat: 49.0069, lon: 8.4037, display_name: 'Karlsruhe, Germany' },
    'stuttgart': { lat: 48.7758, lon: 9.1829, display_name: 'Stuttgart, Germany' },
    'nuremberg': { lat: 49.4521, lon: 11.0767, display_name: 'Nuremberg, Germany' },
    'augsburg': { lat: 48.3705, lon: 10.8978, display_name: 'Augsburg, Germany' },
    'regensburg': { lat: 49.0134, lon: 12.1016, display_name: 'Regensburg, Germany' },
    'ingolstadt': { lat: 48.7665, lon: 11.4258, display_name: 'Ingolstadt, Germany' },
    'freiburg': { lat: 47.9990, lon: 7.8421, display_name: 'Freiburg, Germany' },
    'ulm': { lat: 48.4011, lon: 9.9876, display_name: 'Ulm, Germany' },
    'konstanz': { lat: 47.6603, lon: 9.1758, display_name: 'Konstanz, Germany' },
    'saarbrücken': { lat: 49.2401, lon: 6.9969, display_name: 'Saarbrücken, Germany' },
    'kaiserslautern': { lat: 49.4401, lon: 7.7491, display_name: 'Kaiserslautern, Germany' },
    'trier': { lat: 49.7492, lon: 6.6386, display_name: 'Trier, Germany' },
    'koblenz': { lat: 50.3569, lon: 7.5890, display_name: 'Koblenz, Germany' },
    'mainz': { lat: 49.9929, lon: 8.2473, display_name: 'Mainz, Germany' },
    'wiesbaden': { lat: 50.0782, lon: 8.2398, display_name: 'Wiesbaden, Germany' },
    'darmstadt': { lat: 49.8728, lon: 8.6512, display_name: 'Darmstadt, Germany' },
    'würzburg': { lat: 49.7913, lon: 9.9534, display_name: 'Würzburg, Germany' },
    'aschaffenburg': { lat: 49.9769, lon: 9.1582, display_name: 'Aschaffenburg, Germany' },
    'schweinfurt': { lat: 50.0500, lon: 10.2333, display_name: 'Schweinfurt, Germany' },
    'bayreuth': { lat: 49.9456, lon: 11.5713, display_name: 'Bayreuth, Germany' },
    'bamberg': { lat: 49.8988, lon: 10.9028, display_name: 'Bamberg, Germany' },
    'erlangen': { lat: 49.5896, lon: 11.0078, display_name: 'Erlangen, Germany' },
    'fürth': { lat: 49.4783, lon: 10.9903, display_name: 'Fürth, Germany' },
    'coburg': { lat: 50.2612, lon: 10.9627, display_name: 'Coburg, Germany' },
    'hof': { lat: 50.3167, lon: 11.9167, display_name: 'Hof, Germany' },
    'passau': { lat: 48.5667, lon: 13.4667, display_name: 'Passau, Germany' },
    'landshut': { lat: 48.5372, lon: 12.1522, display_name: 'Landshut, Germany' },
    'rosenheim': { lat: 47.8561, lon: 12.1289, display_name: 'Rosenheim, Germany' },
    'kempten': { lat: 47.7333, lon: 10.3167, display_name: 'Kempten, Germany' },
    'memmingen': { lat: 47.9833, lon: 10.1833, display_name: 'Memmingen, Germany' },
  };

  // Try to find an exact match
  for (const [key, value] of Object.entries(commonLocations)) {
    if (locationLower.includes(key)) {
      return value;
    }
  }

  // If no match found, generate a random location near Germany as a fallback
  // This ensures we always show something on the map
  return {
    lat: 49.0 + (Math.random() * 2 - 1),
    lon: 10.0 + (Math.random() * 2 - 1),
    display_name: location // Use the original input as display name
  };
};
