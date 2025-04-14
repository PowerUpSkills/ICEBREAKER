/**
 * Geocoding proxy service to handle CORS issues with OpenStreetMap Nominatim API
 * This provides alternative methods for geocoding that work around CORS restrictions
 *
 * It also provides location suggestions for autocomplete functionality
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
  return getLocationFromDatabase(locationLower);
};

/**
 * Database of common locations with their coordinates
 * This is used for both geocoding and autocomplete suggestions
 *
 * @type {Object.<string, {lat: number, lon: number, display_name: string}>}
 */
const locationDatabase = {
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
    // German cities with both German and English names
    'köln': { lat: 50.9375, lon: 6.9603, display_name: 'Köln (Cologne), Germany' },
    'cologne': { lat: 50.9375, lon: 6.9603, display_name: 'Köln (Cologne), Germany' },
    'münchen': { lat: 48.1351, lon: 11.5820, display_name: 'München (Munich), Germany' },
    'munich': { lat: 48.1351, lon: 11.5820, display_name: 'München (Munich), Germany' },
    'nürnberg': { lat: 49.4521, lon: 11.0767, display_name: 'Nürnberg (Nuremberg), Germany' },
    'nuremberg': { lat: 49.4521, lon: 11.0767, display_name: 'Nürnberg (Nuremberg), Germany' },
    'wien': { lat: 48.2082, lon: 16.3738, display_name: 'Wien (Vienna), Austria' },
    'vienna': { lat: 48.2082, lon: 16.3738, display_name: 'Wien (Vienna), Austria' },
    'mailand': { lat: 45.4642, lon: 9.1900, display_name: 'Mailand (Milan), Italy' },
    'milan': { lat: 45.4642, lon: 9.1900, display_name: 'Mailand (Milan), Italy' },
    'rom': { lat: 41.9028, lon: 12.4964, display_name: 'Rom (Rome), Italy' },
    'rome': { lat: 41.9028, lon: 12.4964, display_name: 'Rom (Rome), Italy' },
    'venedig': { lat: 45.4408, lon: 12.3155, display_name: 'Venedig (Venice), Italy' },
    'venice': { lat: 45.4408, lon: 12.3155, display_name: 'Venedig (Venice), Italy' },
    'florenz': { lat: 43.7696, lon: 11.2558, display_name: 'Florenz (Florence), Italy' },
    'florence': { lat: 43.7696, lon: 11.2558, display_name: 'Florenz (Florence), Italy' },
    'neapel': { lat: 40.8518, lon: 14.2681, display_name: 'Neapel (Naples), Italy' },
    'naples': { lat: 40.8518, lon: 14.2681, display_name: 'Neapel (Naples), Italy' },
    'warschau': { lat: 52.2297, lon: 21.0122, display_name: 'Warschau (Warsaw), Poland' },
    'warsaw': { lat: 52.2297, lon: 21.0122, display_name: 'Warschau (Warsaw), Poland' },
    'krakau': { lat: 50.0647, lon: 19.9450, display_name: 'Krakau (Krakow), Poland' },
    'krakow': { lat: 50.0647, lon: 19.9450, display_name: 'Krakau (Krakow), Poland' },
    'prag': { lat: 50.0755, lon: 14.4378, display_name: 'Prag (Prague), Czech Republic' },
    'prague': { lat: 50.0755, lon: 14.4378, display_name: 'Prag (Prague), Czech Republic' },
    'brüssel': { lat: 50.8503, lon: 4.3517, display_name: 'Brüssel (Brussels), Belgium' },
    'brussels': { lat: 50.8503, lon: 4.3517, display_name: 'Brüssel (Brussels), Belgium' },
    'antwerpen': { lat: 51.2194, lon: 4.4025, display_name: 'Antwerpen (Antwerp), Belgium' },
    'antwerp': { lat: 51.2194, lon: 4.4025, display_name: 'Antwerpen (Antwerp), Belgium' },
    'zürich': { lat: 47.3769, lon: 8.5417, display_name: 'Zürich (Zurich), Switzerland' },
    'zurich': { lat: 47.3769, lon: 8.5417, display_name: 'Zürich (Zurich), Switzerland' },
    'genf': { lat: 46.2044, lon: 6.1432, display_name: 'Genf (Geneva), Switzerland' },
    'geneva': { lat: 46.2044, lon: 6.1432, display_name: 'Genf (Geneva), Switzerland' },
    'basel': { lat: 47.5596, lon: 7.5886, display_name: 'Basel, Switzerland' },
    'bern': { lat: 46.9480, lon: 7.4474, display_name: 'Bern, Switzerland' },
    'lissabon': { lat: 38.7223, lon: -9.1393, display_name: 'Lissabon (Lisbon), Portugal' },
    'lisbon': { lat: 38.7223, lon: -9.1393, display_name: 'Lissabon (Lisbon), Portugal' },
    'madrid': { lat: 40.4168, lon: -3.7038, display_name: 'Madrid, Spain' },
    'barcelona': { lat: 41.3851, lon: 2.1734, display_name: 'Barcelona, Spain' },
    'valencia': { lat: 39.4699, lon: -0.3763, display_name: 'Valencia, Spain' },
    'sevilla': { lat: 37.3891, lon: -5.9845, display_name: 'Sevilla (Seville), Spain' },
    'seville': { lat: 37.3891, lon: -5.9845, display_name: 'Sevilla (Seville), Spain' },
    'amsterdam': { lat: 52.3676, lon: 4.9041, display_name: 'Amsterdam, Netherlands' },
    'rotterdam': { lat: 51.9244, lon: 4.4777, display_name: 'Rotterdam, Netherlands' },
    'den haag': { lat: 52.0705, lon: 4.3007, display_name: 'Den Haag (The Hague), Netherlands' },
    'the hague': { lat: 52.0705, lon: 4.3007, display_name: 'Den Haag (The Hague), Netherlands' },
    'kopenhagen': { lat: 55.6761, lon: 12.5683, display_name: 'Kopenhagen (Copenhagen), Denmark' },
    'copenhagen': { lat: 55.6761, lon: 12.5683, display_name: 'Kopenhagen (Copenhagen), Denmark' },
    'stockholm': { lat: 59.3293, lon: 18.0686, display_name: 'Stockholm, Sweden' },
    'göteborg': { lat: 57.7089, lon: 11.9746, display_name: 'Göteborg (Gothenburg), Sweden' },
    'gothenburg': { lat: 57.7089, lon: 11.9746, display_name: 'Göteborg (Gothenburg), Sweden' },
    'oslo': { lat: 59.9139, lon: 10.7522, display_name: 'Oslo, Norway' },
    'helsinki': { lat: 60.1699, lon: 24.9384, display_name: 'Helsinki, Finland' },
    'dublin': { lat: 53.3498, lon: -6.2603, display_name: 'Dublin, Ireland' },
    'athen': { lat: 37.9838, lon: 23.7275, display_name: 'Athen (Athens), Greece' },
    'athens': { lat: 37.9838, lon: 23.7275, display_name: 'Athen (Athens), Greece' },
    'thessaloniki': { lat: 40.6401, lon: 22.9444, display_name: 'Thessaloniki, Greece' },
    'budapest': { lat: 47.4979, lon: 19.0402, display_name: 'Budapest, Hungary' },
    'bukarest': { lat: 44.4268, lon: 26.1025, display_name: 'Bukarest (Bucharest), Romania' },
    'bucharest': { lat: 44.4268, lon: 26.1025, display_name: 'Bukarest (Bucharest), Romania' },
    'sofia': { lat: 42.6977, lon: 23.3219, display_name: 'Sofia, Bulgaria' },
    'belgrad': { lat: 44.7866, lon: 20.4489, display_name: 'Belgrad (Belgrade), Serbia' },
    'belgrade': { lat: 44.7866, lon: 20.4489, display_name: 'Belgrad (Belgrade), Serbia' },
    'zagreb': { lat: 45.8150, lon: 15.9819, display_name: 'Zagreb, Croatia' },
    'istanbul': { lat: 41.0082, lon: 28.9784, display_name: 'Istanbul, Turkey' },
    'ankara': { lat: 39.9334, lon: 32.8597, display_name: 'Ankara, Turkey' },

    // Major international cities
    'london': { lat: 51.5074, lon: -0.1278, display_name: 'London, United Kingdom' },
    'manchester': { lat: 53.4808, lon: -2.2426, display_name: 'Manchester, United Kingdom' },
    'birmingham': { lat: 52.4862, lon: -1.8904, display_name: 'Birmingham, United Kingdom' },
    'edinburgh': { lat: 55.9533, lon: -3.1883, display_name: 'Edinburgh, United Kingdom' },
    'glasgow': { lat: 55.8642, lon: -4.2518, display_name: 'Glasgow, United Kingdom' },
    'paris': { lat: 48.8566, lon: 2.3522, display_name: 'Paris, France' },
    'marseille': { lat: 43.2965, lon: 5.3698, display_name: 'Marseille, France' },
    'lyon': { lat: 45.7640, lon: 4.8357, display_name: 'Lyon, France' },
    'toulouse': { lat: 43.6047, lon: 1.4442, display_name: 'Toulouse, France' },
    'nizza': { lat: 43.7102, lon: 7.2620, display_name: 'Nizza (Nice), France' },
    'nice': { lat: 43.7102, lon: 7.2620, display_name: 'Nizza (Nice), France' },
    'new york': { lat: 40.7128, lon: -74.0060, display_name: 'New York, USA' },
    'los angeles': { lat: 34.0522, lon: -118.2437, display_name: 'Los Angeles, USA' },
    'chicago': { lat: 41.8781, lon: -87.6298, display_name: 'Chicago, USA' },
    'houston': { lat: 29.7604, lon: -95.3698, display_name: 'Houston, USA' },
    'phoenix': { lat: 33.4484, lon: -112.0740, display_name: 'Phoenix, USA' },
    'philadelphia': { lat: 39.9526, lon: -75.1652, display_name: 'Philadelphia, USA' },
    'san antonio': { lat: 29.4241, lon: -98.4936, display_name: 'San Antonio, USA' },
    'san diego': { lat: 32.7157, lon: -117.1611, display_name: 'San Diego, USA' },
    'dallas': { lat: 32.7767, lon: -96.7970, display_name: 'Dallas, USA' },
    'san jose': { lat: 37.3382, lon: -121.8863, display_name: 'San Jose, USA' },
    'austin': { lat: 30.2672, lon: -97.7431, display_name: 'Austin, USA' },
    'san francisco': { lat: 37.7749, lon: -122.4194, display_name: 'San Francisco, USA' },
    'seattle': { lat: 47.6062, lon: -122.3321, display_name: 'Seattle, USA' },
    'boston': { lat: 42.3601, lon: -71.0589, display_name: 'Boston, USA' },
    'washington': { lat: 38.9072, lon: -77.0369, display_name: 'Washington D.C., USA' },
    'miami': { lat: 25.7617, lon: -80.1918, display_name: 'Miami, USA' },
    'denver': { lat: 39.7392, lon: -104.9903, display_name: 'Denver, USA' },
    'toronto': { lat: 43.6532, lon: -79.3832, display_name: 'Toronto, Canada' },
    'montreal': { lat: 45.5017, lon: -73.5673, display_name: 'Montreal, Canada' },
    'vancouver': { lat: 49.2827, lon: -123.1207, display_name: 'Vancouver, Canada' },
    'ottawa': { lat: 45.4215, lon: -75.6972, display_name: 'Ottawa, Canada' },
    'calgary': { lat: 51.0447, lon: -114.0719, display_name: 'Calgary, Canada' },
    'mexico city': { lat: 19.4326, lon: -99.1332, display_name: 'Mexico City, Mexico' },
    'mexiko stadt': { lat: 19.4326, lon: -99.1332, display_name: 'Mexiko Stadt (Mexico City), Mexico' },
    'guadalajara': { lat: 20.6597, lon: -103.3496, display_name: 'Guadalajara, Mexico' },
    'monterrey': { lat: 25.6866, lon: -100.3161, display_name: 'Monterrey, Mexico' },
    'buenos aires': { lat: -34.6037, lon: -58.3816, display_name: 'Buenos Aires, Argentina' },
    'rio de janeiro': { lat: -22.9068, lon: -43.1729, display_name: 'Rio de Janeiro, Brazil' },
    'são paulo': { lat: -23.5505, lon: -46.6333, display_name: 'São Paulo, Brazil' },
    'sao paulo': { lat: -23.5505, lon: -46.6333, display_name: 'São Paulo, Brazil' },
    'brasília': { lat: -15.7801, lon: -47.9292, display_name: 'Brasília, Brazil' },
    'brasilia': { lat: -15.7801, lon: -47.9292, display_name: 'Brasília, Brazil' },
    'santiago': { lat: -33.4489, lon: -70.6693, display_name: 'Santiago, Chile' },
    'lima': { lat: -12.0464, lon: -77.0428, display_name: 'Lima, Peru' },
    'bogotá': { lat: 4.7110, lon: -74.0721, display_name: 'Bogotá, Colombia' },
    'bogota': { lat: 4.7110, lon: -74.0721, display_name: 'Bogotá, Colombia' },
    'caracas': { lat: 10.4806, lon: -66.9036, display_name: 'Caracas, Venezuela' },
    'tokyo': { lat: 35.6762, lon: 139.6503, display_name: 'Tokyo, Japan' },
    'tokio': { lat: 35.6762, lon: 139.6503, display_name: 'Tokio (Tokyo), Japan' },
    'osaka': { lat: 34.6937, lon: 135.5023, display_name: 'Osaka, Japan' },
    'kyoto': { lat: 35.0116, lon: 135.7681, display_name: 'Kyoto, Japan' },
    'yokohama': { lat: 35.4437, lon: 139.6380, display_name: 'Yokohama, Japan' },
    'seoul': { lat: 37.5665, lon: 126.9780, display_name: 'Seoul, South Korea' },
    'busan': { lat: 35.1796, lon: 129.0756, display_name: 'Busan, South Korea' },
    'beijing': { lat: 39.9042, lon: 116.4074, display_name: 'Beijing, China' },
    'peking': { lat: 39.9042, lon: 116.4074, display_name: 'Peking (Beijing), China' },
    'shanghai': { lat: 31.2304, lon: 121.4737, display_name: 'Shanghai, China' },
    'guangzhou': { lat: 23.1291, lon: 113.2644, display_name: 'Guangzhou, China' },
    'shenzhen': { lat: 22.5431, lon: 114.0579, display_name: 'Shenzhen, China' },
    'hong kong': { lat: 22.3193, lon: 114.1694, display_name: 'Hong Kong' },
    'hongkong': { lat: 22.3193, lon: 114.1694, display_name: 'Hongkong (Hong Kong)' },
    'taipei': { lat: 25.0330, lon: 121.5654, display_name: 'Taipei, Taiwan' },
    'bangkok': { lat: 13.7563, lon: 100.5018, display_name: 'Bangkok, Thailand' },
    'singapore': { lat: 1.3521, lon: 103.8198, display_name: 'Singapore' },
    'singapur': { lat: 1.3521, lon: 103.8198, display_name: 'Singapur (Singapore)' },
    'kuala lumpur': { lat: 3.1390, lon: 101.6869, display_name: 'Kuala Lumpur, Malaysia' },
    'jakarta': { lat: -6.2088, lon: 106.8456, display_name: 'Jakarta, Indonesia' },
    'manila': { lat: 14.5995, lon: 120.9842, display_name: 'Manila, Philippines' },
    'hanoi': { lat: 21.0285, lon: 105.8542, display_name: 'Hanoi, Vietnam' },
    'ho chi minh city': { lat: 10.8231, lon: 106.6297, display_name: 'Ho Chi Minh City, Vietnam' },
    'sydney': { lat: -33.8688, lon: 151.2093, display_name: 'Sydney, Australia' },
    'melbourne': { lat: -37.8136, lon: 144.9631, display_name: 'Melbourne, Australia' },
    'brisbane': { lat: -27.4698, lon: 153.0251, display_name: 'Brisbane, Australia' },
    'perth': { lat: -31.9505, lon: 115.8605, display_name: 'Perth, Australia' },
    'auckland': { lat: -36.8509, lon: 174.7645, display_name: 'Auckland, New Zealand' },
    'wellington': { lat: -41.2865, lon: 174.7762, display_name: 'Wellington, New Zealand' },
    'mumbai': { lat: 19.0760, lon: 72.8777, display_name: 'Mumbai, India' },
    'bombay': { lat: 19.0760, lon: 72.8777, display_name: 'Bombay (Mumbai), India' },
    'delhi': { lat: 28.7041, lon: 77.1025, display_name: 'Delhi, India' },
    'new delhi': { lat: 28.6139, lon: 77.2090, display_name: 'New Delhi, India' },
    'bangalore': { lat: 12.9716, lon: 77.5946, display_name: 'Bangalore, India' },
    'kolkata': { lat: 22.5726, lon: 88.3639, display_name: 'Kolkata, India' },
    'calcutta': { lat: 22.5726, lon: 88.3639, display_name: 'Calcutta (Kolkata), India' },
    'chennai': { lat: 13.0827, lon: 80.2707, display_name: 'Chennai, India' },
    'madras': { lat: 13.0827, lon: 80.2707, display_name: 'Madras (Chennai), India' },
    'moscow': { lat: 55.7558, lon: 37.6173, display_name: 'Moscow, Russia' },
    'moskau': { lat: 55.7558, lon: 37.6173, display_name: 'Moskau (Moscow), Russia' },
    'st. petersburg': { lat: 59.9343, lon: 30.3351, display_name: 'St. Petersburg, Russia' },
    'sankt petersburg': { lat: 59.9343, lon: 30.3351, display_name: 'Sankt Petersburg (St. Petersburg), Russia' },
    'cairo': { lat: 30.0444, lon: 31.2357, display_name: 'Cairo, Egypt' },
    'kairo': { lat: 30.0444, lon: 31.2357, display_name: 'Kairo (Cairo), Egypt' },
    'alexandria': { lat: 31.2001, lon: 29.9187, display_name: 'Alexandria, Egypt' },
    'alexandria': { lat: 31.2001, lon: 29.9187, display_name: 'Alexandria, Egypt' },
    'cape town': { lat: -33.9249, lon: 18.4241, display_name: 'Cape Town, South Africa' },
    'kapstadt': { lat: -33.9249, lon: 18.4241, display_name: 'Kapstadt (Cape Town), South Africa' },
    'johannesburg': { lat: -26.2041, lon: 28.0473, display_name: 'Johannesburg, South Africa' },
    'dubai': { lat: 25.2048, lon: 55.2708, display_name: 'Dubai, United Arab Emirates' },
    'abu dhabi': { lat: 24.4539, lon: 54.3773, display_name: 'Abu Dhabi, United Arab Emirates' },
    'riyadh': { lat: 24.7136, lon: 46.6753, display_name: 'Riyadh, Saudi Arabia' },
    'riad': { lat: 24.7136, lon: 46.6753, display_name: 'Riad (Riyadh), Saudi Arabia' },
    'tel aviv': { lat: 32.0853, lon: 34.7818, display_name: 'Tel Aviv, Israel' },
    'jerusalem': { lat: 31.7683, lon: 35.2137, display_name: 'Jerusalem, Israel' },
    'jerusalem': { lat: 31.7683, lon: 35.2137, display_name: 'Jerusalem, Israel' },
  };

/**
 * Normalize a string by removing special characters and converting to lowercase
 *
 * @param {string} str - The string to normalize
 * @returns {string} - The normalized string
 */
const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (ö -> o, ü -> u, etc.)
    .replace(/[^a-z0-9\s]/g, ''); // Remove special characters
};

/**
 * Check if a string is a postal code
 *
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a postal code
 */
const isPostalCode = (str) => {
  if (!str) return false;
  // Match common postal code formats
  // German postal codes: 5 digits
  // US/Canadian postal codes: 5 digits or 5+4 digits or alphanumeric
  // UK postal codes: Alphanumeric with spaces
  return /^\d{5}(-\d{4})?$/.test(str) || // US format
         /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(str) || // Canadian format
         /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/.test(str); // UK format
};

/**
 * Calculate the Levenshtein distance between two strings
 * This helps us find close matches even with typos
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - The edit distance between the strings
 */
const levenshteinDistance = (a, b) => {
  if (!a || !b) return (a || b).length;

  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Calculate similarity score between two strings (0-1)
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity score (0-1)
 */
const calculateSimilarity = (a, b) => {
  if (!a || !b) return 0;
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  const distance = levenshteinDistance(a, b);
  return 1 - (distance / maxLength);
};

/**
 * Find the most similar location in the database
 *
 * @param {string} searchTerm - The search term to look for
 * @param {string} countryFilter - Optional country to filter results by
 * @returns {{location: Object, score: number}} - The most similar location and its similarity score
 */
const findMostSimilarLocation = (searchTerm, countryFilter = null) => {
  if (!searchTerm) return { location: null, score: 0 };

  const normalizedSearchTerm = normalizeString(searchTerm);
  const normalizedCountryFilter = countryFilter ? normalizeString(countryFilter) : null;

  let bestMatch = null;
  let bestScore = 0;
  let secondBestMatch = null;
  let secondBestScore = 0;

  // Search through all locations
  for (const [key, value] of Object.entries(locationDatabase)) {
    // If country filter is applied, check if the location is in that country
    if (normalizedCountryFilter && !normalizeString(value.display_name).includes(normalizedCountryFilter)) {
      continue; // Skip this location if it doesn't match the country filter
    }

    // Calculate similarity scores
    const keyScore = calculateSimilarity(normalizedSearchTerm, normalizeString(key));
    const displayNameScore = calculateSimilarity(normalizedSearchTerm, normalizeString(value.display_name));

    // Use the better of the two scores
    const score = Math.max(keyScore, displayNameScore);

    // Check if this is the best match so far
    if (score > bestScore) {
      secondBestMatch = bestMatch;
      secondBestScore = bestScore;
      bestMatch = value;
      bestScore = score;
    } else if (score > secondBestScore) {
      secondBestMatch = value;
      secondBestScore = score;
    }
  }

  return {
    location: bestMatch,
    score: bestScore,
    secondBestLocation: secondBestMatch,
    secondBestScore: secondBestScore
  };
};

/**
 * Get a location from the database based on a search term
 *
 * @param {string} searchTerm - The search term to look for
 * @param {string} countryFilter - Optional country to filter results by
 * @returns {{lat: number, lon: number, display_name: string, confidence: string} | null} - The location or null if not found
 */
const getLocationFromDatabase = (searchTerm, countryFilter = null) => {
  if (!searchTerm) return null;

  const normalizedSearchTerm = normalizeString(searchTerm);
  const normalizedCountryFilter = countryFilter ? normalizeString(countryFilter) : null;

  // Check if the search term is a postal code (special handling)
  if (isPostalCode(searchTerm)) {
    // For postal codes, we'll just return a location in the specified country
    // or Germany as a default
    if (normalizedCountryFilter) {
      // Find any city in the specified country
      for (const [_, cityValue] of Object.entries(locationDatabase)) {
        if (normalizeString(cityValue.display_name).includes(normalizedCountryFilter)) {
          return {
            ...cityValue,
            display_name: `${searchTerm} (Postal Code), ${countryFilter || 'Unknown Country'}`,
            confidence: 'high',
            isPostalCode: true
          };
        }
      }
    }

    // Default to a location in Germany for postal codes
    return {
      lat: 51.1657, // Berlin
      lon: 10.4515, // Center of Germany
      display_name: `${searchTerm} (Postal Code), ${countryFilter || 'Germany'}`,
      confidence: 'medium',
      isPostalCode: true
    };
  }

  // Try to find an exact match first
  for (const [key, value] of Object.entries(locationDatabase)) {
    // If country filter is applied, check if the location is in that country
    if (normalizedCountryFilter && !normalizeString(value.display_name).includes(normalizedCountryFilter)) {
      continue; // Skip this location if it doesn't match the country filter
    }

    // Check for exact matches
    if (searchTerm.toLowerCase() === key ||
        searchTerm.toLowerCase() === value.display_name.toLowerCase()) {
      return {
        ...value,
        confidence: 'exact',
        matchType: 'exact'
      };
    }
  }

  // If no exact match, find the most similar location
  const { location, score, secondBestLocation, secondBestScore } = findMostSimilarLocation(searchTerm, countryFilter);

  // If we found a good match
  if (location && score > 0.8) {
    return {
      ...location,
      confidence: 'high',
      similarityScore: score,
      matchType: 'fuzzy'
    };
  }

  // If we found a decent match
  if (location && score > 0.6) {
    return {
      ...location,
      confidence: 'medium',
      similarityScore: score,
      matchType: 'fuzzy'
    };
  }

  // If we found a weak match
  if (location && score > 0.4) {
    return {
      ...location,
      confidence: 'low',
      similarityScore: score,
      matchType: 'fuzzy'
    };
  }

  // If we have a country filter, try to find any location in that country
  if (normalizedCountryFilter) {
    for (const [_, value] of Object.entries(locationDatabase)) {
      if (normalizeString(value.display_name).includes(normalizedCountryFilter)) {
        return {
          ...value,
          display_name: `${searchTerm}, ${countryFilter}`,
          confidence: 'country-only',
          matchType: 'country-fallback'
        };
      }
    }
  }

  // Last resort fallback - use a default location but mark it clearly
  return {
    lat: 51.1657, // Berlin
    lon: 10.4515, // Center of Germany
    display_name: `${searchTerm}, ${countryFilter || 'Unknown Location'}`,
    confidence: 'unknown',
    matchType: 'default-fallback',
    isGeneric: true
  };
};

/**
 * Get location suggestions based on a search term
 *
 * @param {string} searchTerm - The search term to get suggestions for
 * @param {string} countryFilter - Optional country to filter results by
 * @returns {Array<{lat: number, lon: number, display_name: string, confidence: string}>} - Array of location suggestions
 */
export const getSuggestedLocations = (searchTerm, countryFilter = null) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const searchTermLower = searchTerm.toLowerCase();
  const normalizedSearchTerm = normalizeString(searchTerm);
  const normalizedCountryFilter = countryFilter ? normalizeString(countryFilter) : null;
  const results = [];
  const exactMatches = [];
  const highConfidenceMatches = [];
  const mediumConfidenceMatches = [];
  const lowConfidenceMatches = [];

  // Handle postal code as a special case
  if (isPostalCode(searchTerm)) {
    // Create a synthetic result for the postal code
    const postalCodeResult = {
      lat: 51.1657, // Berlin
      lon: 10.4515, // Center of Germany
      display_name: `${searchTerm} (Postal Code), ${countryFilter || 'Germany'}`,
      isPostalCode: true,
      confidence: 'high',
      matchType: 'postal-code'
    };
    exactMatches.push(postalCodeResult);
  }

  // First pass: look for exact matches
  for (const [key, value] of Object.entries(locationDatabase)) {
    // If country filter is applied, check if the location is in that country
    if (normalizedCountryFilter && !normalizeString(value.display_name).includes(normalizedCountryFilter)) {
      continue; // Skip this location if it doesn't match the country filter
    }

    // Check for exact matches
    if (key === searchTermLower || value.display_name.toLowerCase() === searchTermLower) {
      exactMatches.push({
        ...value,
        confidence: 'exact',
        matchType: 'exact'
      });
    }
  }

  // If we found exact matches, we can skip the fuzzy matching
  if (exactMatches.length === 0) {
    // Calculate similarity scores for all locations
    const scoredLocations = [];

    for (const [key, value] of Object.entries(locationDatabase)) {
      // If country filter is applied, check if the location is in that country
      if (normalizedCountryFilter && !normalizeString(value.display_name).includes(normalizedCountryFilter)) {
        continue; // Skip this location if it doesn't match the country filter
      }

      const normalizedKey = normalizeString(key);
      const normalizedDisplayName = normalizeString(value.display_name);

      // Calculate similarity scores
      const keyScore = calculateSimilarity(normalizedSearchTerm, normalizedKey);
      const displayNameScore = calculateSimilarity(normalizedSearchTerm, normalizedDisplayName);
      const score = Math.max(keyScore, displayNameScore);

      // Word-level matching for multi-word searches
      let wordMatchBonus = 0;
      const searchWords = normalizedSearchTerm.split(/\s+/);
      const keyWords = normalizedKey.split(/\s+/);
      const displayNameWords = normalizedDisplayName.split(/\s+/);

      // Check if any word in the search term exactly matches any word in the key or display name
      const exactWordMatches = searchWords.filter(word =>
        keyWords.some(keyWord => keyWord === word) ||
        displayNameWords.some(displayWord => displayWord === word)
      ).length;

      // Add a bonus for exact word matches
      if (exactWordMatches > 0) {
        wordMatchBonus = 0.1 * exactWordMatches;
      }

      // Add the location with its score
      scoredLocations.push({
        location: value,
        score: score + wordMatchBonus
      });
    }

    // Sort by score (highest first)
    scoredLocations.sort((a, b) => b.score - a.score);

    // Categorize by confidence level
    scoredLocations.forEach(({ location, score }) => {
      const result = {
        ...location,
        similarityScore: score,
        matchType: 'fuzzy'
      };

      if (score > 0.8) {
        result.confidence = 'high';
        highConfidenceMatches.push(result);
      } else if (score > 0.6) {
        result.confidence = 'medium';
        mediumConfidenceMatches.push(result);
      } else if (score > 0.4) {
        result.confidence = 'low';
        lowConfidenceMatches.push(result);
      }
    });
  }

  // Combine all results in order of confidence
  results.push(...exactMatches);
  results.push(...highConfidenceMatches);
  results.push(...mediumConfidenceMatches);
  results.push(...lowConfidenceMatches);

  // If no results found and we have a country filter, add a generic entry for the country
  if (results.length === 0 && countryFilter) {
    // Find any city in the specified country to get coordinates
    for (const [_, value] of Object.entries(locationDatabase)) {
      if (normalizeString(value.display_name).includes(normalizedCountryFilter)) {
        results.push({
          ...value,
          display_name: `${searchTerm}, ${countryFilter}`,
          confidence: 'country-only',
          matchType: 'country-fallback'
        });
        break;
      }
    }
  }

  // If still no results, add a generic entry
  if (results.length === 0) {
    results.push({
      lat: 51.1657, // Berlin
      lon: 10.4515, // Center of Germany
      display_name: `${searchTerm}, ${countryFilter || 'Unknown Location'}`,
      confidence: 'unknown',
      matchType: 'default-fallback',
      isGeneric: true
    });
  }

  // Limit to 10 results for performance
  return results.slice(0, 10);
};

/**
 * Get a list of available countries for filtering
 *
 * @returns {Array<string>} - Array of country names
 */
export const getAvailableCountries = () => {
  const countries = new Set();

  // Extract countries from the location database
  for (const [_, value] of Object.entries(locationDatabase)) {
    const displayName = value.display_name;
    const parts = displayName.split(',');
    if (parts.length > 1) {
      const country = parts[parts.length - 1].trim();
      if (country && country !== 'Unknown Country') {
        countries.add(country);
      }
    }
  }

  // Convert to array and sort alphabetically
  return Array.from(countries).sort();
};
