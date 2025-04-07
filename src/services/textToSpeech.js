/**
 * Text-to-speech service using the Web Speech API
 */

// Check if the browser supports the Web Speech API
const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

/**
 * Speak the provided text using the Web Speech API
 *
 * @param {string} text - The text to be spoken
 * @param {Object} options - Configuration options
 * @param {string} options.voice - Voice name to use (if available)
 * @param {number} options.rate - Speech rate (0.1 to 10, default 1)
 * @param {number} options.pitch - Speech pitch (0 to 2, default 1)
 * @param {number} options.volume - Speech volume (0 to 1, default 1)
 * @param {Function} options.onstart - Callback when speech starts
 * @param {Function} options.onend - Callback when speech ends
 * @param {Function} options.onpause - Callback when speech is paused
 * @param {Function} options.onresume - Callback when speech is resumed
 * @param {Function} options.onboundary - Callback when word/sentence boundary is reached
 * @param {Function} options.onmark - Callback when SSML mark is reached
 * @returns {Object} - Controller object with cancel method and the utterance
 */
export const speak = (text, options = {}) => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported in this browser');
    throw new Error('Speech synthesis not supported');
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Set default options
  const defaultOptions = {
    rate: 1,
    pitch: 1,
    volume: 1
  };

  const speechOptions = { ...defaultOptions, ...options };

  // Apply options
  utterance.rate = speechOptions.rate;
  utterance.pitch = speechOptions.pitch;
  utterance.volume = speechOptions.volume;

  // Set voice if specified and available
  if (speechOptions.voice) {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice =>
      voice.name.toLowerCase().includes(speechOptions.voice.toLowerCase())
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }

  // Set event handlers if provided
  if (speechOptions.onstart) utterance.onstart = speechOptions.onstart;
  if (speechOptions.onend) utterance.onend = speechOptions.onend;
  if (speechOptions.onpause) utterance.onpause = speechOptions.onpause;
  if (speechOptions.onresume) utterance.onresume = speechOptions.onresume;
  if (speechOptions.onboundary) utterance.onboundary = speechOptions.onboundary;
  if (speechOptions.onmark) utterance.onmark = speechOptions.onmark;

  // Start speaking
  window.speechSynthesis.speak(utterance);

  // Return controller object
  return {
    utterance,
    cancel: () => window.speechSynthesis.cancel()
  };
};

/**
 * Get all available voices
 *
 * @returns {Array} - Array of available voice objects
 */
export const getAvailableVoices = () => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported in this browser');
    return [];
  }

  return window.speechSynthesis.getVoices();
};

/**
 * Check if text-to-speech is supported in the current browser
 *
 * @returns {boolean} - True if supported, false otherwise
 */
export const isSupported = () => {
  return isSpeechSynthesisSupported();
};
