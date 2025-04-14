import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import LocationMap from '../common/LocationMap';
import './animatedPresentation.css';
import './fonts.css';

const AnimatedProfilePresentation = ({ profileText, participantData, onClose }) => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionTitle, setIsSectionTitle] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [volume, setVolume] = useState(30); // Volume as percentage (0-100)
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const nextTimeoutRef = useRef(null); // Store the next timeout duration
  const pauseTimeRef = useRef(null); // Store the time when paused

  // Initialize audio element
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/Summer-Pack-No-Copyright-Music-01-Summer-FULL-TRACK.mp3');
      audioRef.current.volume = volume / 100; // Convert percentage to 0-1 range
      audioRef.current.loop = true; // Loop the audio
    } else {
      // Update volume if audio element already exists
      audioRef.current.volume = volume / 100;
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [volume]); // Re-run when volume changes

  // Process the profile text into sentences and identify emojis
  useEffect(() => {
    if (!profileText) return;

    // Log participant data for debugging
    console.log('Participant data in presentation:', participantData);
    if (participantData && participantData.answers) {
      console.log('Locations:', {
        birthplace: participantData.answers.birthplace,
        location5: participantData.answers.location5,
        location10: participantData.answers.location10
      });
    }

    // Clean up text for speech (remove markdown formatting)
    const cleanText = profileText
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
      .replace(/#{1,6}\s?(.*)/g, '$1') // Remove heading formatting
      .replace(/\(\d+%\)/g, '') // Remove percentages
      .replace(/- /g, '') // Remove list markers
      .replace(/\n+/g, '. '); // Replace newlines with periods for better sentence splitting

    // Split into sentences - improved to handle more cases
    const sentenceArray = cleanText
      .split(/\.\s+|\!\s+|\?\s+|\. |\! |\? /)
      .filter(sentence => sentence.trim().length > 0)
      .map(sentence => sentence.trim())
      .filter(sentence => !sentence.match(/^[\d\s]*$/)); // Filter out sentences that are just numbers or whitespace

    console.log('Sentences for presentation:', sentenceArray);
    setSentences(sentenceArray);
  }, [profileText, participantData]);

  // Function to extract emoji from text
  const extractEmoji = (text) => {
    const emojiRegex = /[\p{Emoji}]/gu;
    const emojis = text.match(emojiRegex);
    return emojis ? emojis[0] : '';
  };

  // Function to extract location from text
  const extractLocation = (text) => {
    if (!participantData || !participantData.answers) return null;

    const lowerText = text.toLowerCase();
    const locations = [
      participantData.answers.birthplace,
      participantData.answers.location5,
      participantData.answers.location10
    ].filter(Boolean);

    // Check if any of the locations are mentioned in the text
    for (const location of locations) {
      if (location && lowerText.includes(location.toLowerCase())) {
        return location;
      }
    }

    // Check for specific location sections and keywords
    if (lowerText.includes('origin story') || lowerText.includes('born in') || lowerText.includes('birthplace')) {
      return participantData.answers.birthplace;
    }
    if (lowerText.includes('early adventures') || lowerText.includes('10 years ago') || lowerText.includes('decade ago')) {
      return participantData.answers.location10;
    }
    if (lowerText.includes('recent journey') || lowerText.includes('5 years ago') || lowerText.includes('five years ago')) {
      return participantData.answers.location5;
    }

    return null;
  };

  // Check if the sentence is introducing the team member
  const isTeamMemberIntro = (sentence) => {
    if (!sentence || !participantData) return false;

    const lowerSentence = sentence.toLowerCase();
    const name = participantData.name;

    // Check for patterns that typically introduce a team member
    return (
      (lowerSentence.includes('team member') ||
       lowerSentence.includes('profile') ||
       lowerSentence.includes('introducing') ||
       lowerSentence.includes('meet')) &&
      lowerSentence.includes(name.toLowerCase())
    );
  };

  // Extract the member name from an introduction sentence
  const extractMemberName = () => {
    if (!participantData) return '';
    return participantData.name;
  };

  // Find a relevant emoji for the current sentence
  const findRelevantEmoji = (sentence) => {
    if (!sentence) return '✨';

    // Extract emoji if present in the sentence
    const extractedEmoji = extractEmoji(sentence);
    if (extractedEmoji) return extractedEmoji;

    // Special emoji for member introduction
    if (isTeamMemberIntro(sentence)) return '🎉';

    const lowerSentence = sentence.toLowerCase();

    // Check for location-related content
    if (extractLocation(sentence)) return '🌍';

    // Check for section headers
    if (lowerSentence.includes('profile')) return '📋';
    if (lowerSentence.includes('origin story') || lowerSentence.includes('background')) return '🏠';
    if (lowerSentence.includes('power stats') || lowerSentence.includes('abilities')) return '💪';
    if (lowerSentence.includes('special abilities') || lowerSentence.includes('skills')) return '✨';
    if (lowerSentence.includes('weapon') || lowerSentence.includes('tool')) return '🔧';
    if (lowerSentence.includes('leisure') || lowerSentence.includes('off-duty')) return '🎮';
    if (lowerSentence.includes('secret') || lowerSentence.includes('knowledge')) return '🤫';
    if (lowerSentence.includes('quote') || lowerSentence.includes('saying')) return '💬';
    if (lowerSentence.includes('compatibility') || lowerSentence.includes('team')) return '🤝';

    // Professional
    if (lowerSentence.includes('developer') || lowerSentence.includes('code')) return '💻';
    if (lowerSentence.includes('product owner') || lowerSentence.includes('po')) return '📖';
    if (lowerSentence.includes('scrum master') || lowerSentence.includes('agile')) return '🏃';
    if (lowerSentence.includes('architect') || lowerSentence.includes('design')) return '🏗️';
    if (lowerSentence.includes('tester') || lowerSentence.includes('testing')) return '🔍';
    if (lowerSentence.includes('leader') || lowerSentence.includes('manager')) return '👑';

    // Personal traits
    if (lowerSentence.includes('hobby') || lowerSentence.includes('outside work')) return '🎮';
    if (lowerSentence.includes('superpower') || lowerSentence.includes('ability')) return '⚡';
    if (lowerSentence.includes('challenge') || lowerSentence.includes('problem')) return '🧩';
    if (lowerSentence.includes('productivity') || lowerSentence.includes('fuel')) return '☕';
    if (lowerSentence.includes('coffee') || lowerSentence.includes('tea')) return '☕';
    if (lowerSentence.includes('energy drink') || lowerSentence.includes('caffeine')) return '🥤';
    if (lowerSentence.includes('project') || lowerSentence.includes('work')) return '💼';
    if (lowerSentence.includes('fun fact') || lowerSentence.includes('surprise')) return '🎉';

    // Emotions
    if (lowerSentence.includes('love') || lowerSentence.includes('passion')) return '❤️';
    if (lowerSentence.includes('happy') || lowerSentence.includes('joy')) return '😄';
    if (lowerSentence.includes('laugh') || lowerSentence.includes('funny')) return '😂';
    if (lowerSentence.includes('cool') || lowerSentence.includes('awesome')) return '😎';

    // Default emoji if no keywords match
    return '✨';
  };

  // Start the presentation
  const startPresentation = () => {
    console.log('Start presentation called');
    if (sentences.length === 0) {
      console.log('No sentences to present');
      return;
    }

    setIsPlaying(true);
    setIsPaused(false); // Make sure we're not paused when starting
    setCurrentSentenceIndex(0);
    setProgress(0);

    // Reset refs
    nextTimeoutRef.current = null;
    pauseTimeRef.current = null;

    // Start playing background music
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Start from the beginning
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }

    // Trigger confetti at the start
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.3 }
    });

    // Start the visual animation first
    animateSentence(0);

    // Add a timer to trigger the final confetti when animation completes
    const totalDuration = sentences.length * 8000; // Increased estimate based on slower transitions
    setTimeout(() => {
      if (isPlaying) { // Only trigger if still playing
        setIsPlaying(false);

        // Stop the background music
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Final confetti celebration
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 }
        });
      }
    }, totalDuration);
  };

  // Animate through sentences one by one
  const animateSentence = (sentenceIndex) => {
    // Check if we've reached the end of the presentation
    if (sentenceIndex >= sentences.length) {
      setIsPlaying(false);
      return;
    }

    const sentence = sentences[sentenceIndex];
    setCurrentSentence(sentence);
    setCurrentEmoji(findRelevantEmoji(sentence));
    // Make sure we update the current sentence index
    setCurrentSentenceIndex(sentenceIndex);

    // Check if this sentence contains location information
    const locationInSentence = extractLocation(sentence);

    // Update the state directly
    setCurrentLocation(locationInSentence || '');
    setShowMap(!!locationInSentence);

    // Update progress
    const overallProgress = (sentenceIndex + 1) / sentences.length;
    setProgress(overallProgress * 100);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Determine how long to display this sentence
    // Longer sentences need more time to read
    const baseDisplayTime = 4000; // Increased base time to 4 seconds (was 2 seconds)
    const wordsInSentence = sentence.split(' ').length;
    const readingTime = Math.max(baseDisplayTime, wordsInSentence * 300); // 300ms per word (was 200ms)

    // Check if this sentence is a title/heading
    const isSectionTitle = sentence.includes('**') ||
                        sentence.trim().startsWith('ORIGIN STORY') ||
                        sentence.trim().startsWith('POWER STATS') ||
                        sentence.trim().startsWith('SPECIAL ABILITIES') ||
                        sentence.trim().startsWith('PREFERRED WEAPON') ||
                        sentence.trim().startsWith('LEISURE QUESTS') ||
                        sentence.trim().startsWith('SECRET KNOWLEDGE') ||
                        sentence.trim().startsWith('FAMOUS QUOTE') ||
                        sentence.trim().startsWith('TEAM COMPATIBILITY');

    // Store whether this is a title in state for rendering purposes
    setIsSectionTitle(isSectionTitle);

    // Add extra pause time for section titles and maps
    let displayTime = readingTime;
    if (isSectionTitle) {
      displayTime += 2000; // Add 2 seconds for section titles
      console.log('Section title detected, adding extra time');
    }
    if (showMap) {
      displayTime += 4000; // Add 4 seconds for maps (was 2 seconds)
      console.log('Map detected, adding extra time');
    }

    console.log(`Displaying sentence for ${displayTime}ms`);

    // Store the timeout duration for pause/resume functionality
    nextTimeoutRef.current = displayTime;

    // Only set up the timer if not paused
    if (!isPaused) {
      console.log(`Setting up timer to move to next sentence in ${displayTime}ms`);
      timerRef.current = setTimeout(() => {
        animateSentence(sentenceIndex + 1);
      }, displayTime);
    } else {
      console.log('Presentation is paused, not setting up next timer');
    }
  };

  // Pause the presentation
  const pausePresentation = () => {
    console.log('Pause called, isPlaying:', isPlaying, 'isPaused:', isPaused, 'currentIndex:', currentSentenceIndex);

    if (!isPlaying || isPaused) {
      console.log('Cannot pause: presentation is not playing or already paused');
      return;
    }

    console.log('Pausing presentation at sentence index:', currentSentenceIndex);
    setIsPaused(true);

    // Record the current time when paused
    pauseTimeRef.current = Date.now();

    // Clear the current timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log('Cleared timeout, current sentence will continue on resume');
    }

    // Pause the background music
    if (audioRef.current) {
      audioRef.current.pause();
      console.log('Audio paused');
    }
  };

  // Resume the presentation - simplified approach
  const resumePresentation = () => {
    console.log('Resume called, isPlaying:', isPlaying, 'isPaused:', isPaused, 'currentIndex:', currentSentenceIndex);

    if (!isPlaying || !isPaused) {
      console.log('Cannot resume: presentation is not playing or not paused');
      return;
    }

    console.log('Resuming presentation at sentence index:', currentSentenceIndex);

    // Resume the background music first
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error resuming audio:', error);
      });
    }

    // Simplified approach: just unpause and continue from the current sentence
    setIsPaused(false);

    // Force a re-render of the current sentence with a slight delay
    // This ensures the animation continues properly
    setTimeout(() => {
      // Continue from the current sentence
      console.log('Restarting animation from current sentence:', currentSentenceIndex);

      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set up a new timer to move to the next sentence
      const displayTime = 4000; // Use a reasonable default display time
      timerRef.current = setTimeout(() => {
        console.log('Moving to next sentence:', currentSentenceIndex + 1);
        animateSentence(currentSentenceIndex + 1);
      }, displayTime);
    }, 100);
  };

  // Stop the presentation
  const stopPresentation = () => {
    console.log('Stop presentation called');

    setIsPlaying(false);
    setIsPaused(false);

    // Clear all timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset refs
    nextTimeoutRef.current = null;
    pauseTimeRef.current = null;

    // Stop the background music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    console.log('Presentation stopped and all states reset');
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Stop and clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Persistent header with participant name */}
      {participantData && (
        <div className="persistent-header">
          <div className="persistent-name">
            {participantData.name}
          </div>
        </div>
      )}

      {/* Background effects */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Floating particles */}
      <div className="absolute w-4 h-4 bg-white rounded-full opacity-20 animate-pulse" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
      <div className="absolute w-3 h-3 bg-white rounded-full opacity-30 animate-pulse" style={{ top: '20%', left: '70%', animationDelay: '0.5s' }}></div>
      <div className="absolute w-5 h-5 bg-white rounded-full opacity-20 animate-pulse" style={{ top: '70%', left: '20%', animationDelay: '1s' }}></div>
      <div className="absolute w-6 h-6 bg-white rounded-full opacity-10 animate-pulse" style={{ top: '80%', left: '80%', animationDelay: '1.5s' }}></div>
      <div className="absolute w-4 h-4 bg-white rounded-full opacity-20 animate-pulse" style={{ top: '40%', left: '90%', animationDelay: '2s' }}></div>
      <div className="absolute w-3 h-3 bg-white rounded-full opacity-30 animate-pulse" style={{ top: '60%', left: '40%', animationDelay: '2.5s' }}></div>

      {/* Close button */}
      <button
        onClick={() => {
          stopPresentation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-20 bg-black bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-opacity-50"
      >
        ✕
      </button>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 z-20 transition-all duration-300 shadow-lg" style={{ width: `${progress}%` }}></div>

      {/* Content container with glass effect */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl presentation-mode">
        {/* Emoji */}
        <div className="text-9xl mb-10 transform transition-all duration-500 ease-in-out animate-bounce">
          {currentEmoji}
        </div>

        {/* Current sentence - styled differently based on content type */}
        {isTeamMemberIntro(currentSentence) ? (
          <div className="member-name-container">
            <div className="member-name-intro text-white font-heading shadow-text">
              Team Member Profile:
            </div>
            <div className="member-name shadow-text">
              {extractMemberName()}
            </div>
            {/* Add sparkles around the name for extra effect */}
            <div className="sparkle" style={{ top: '40%', left: '30%', animationDelay: '0s' }}></div>
            <div className="sparkle" style={{ top: '30%', left: '40%', animationDelay: '0.2s' }}></div>
            <div className="sparkle" style={{ top: '60%', left: '60%', animationDelay: '0.4s' }}></div>
            <div className="sparkle" style={{ top: '50%', left: '70%', animationDelay: '0.6s' }}></div>
            <div className="sparkle" style={{ top: '70%', left: '50%', animationDelay: '0.8s' }}></div>
            <div className="sparkle" style={{ top: '30%', left: '60%', animationDelay: '1.0s' }}></div>
            <div className="sparkle" style={{ top: '60%', left: '30%', animationDelay: '1.2s' }}></div>

            {/* Add some confetti for celebration */}
            <div className="confetti" style={{ left: '20%', backgroundColor: '#FF5252', width: '12px', height: '12px', animationDelay: '0.1s' }}></div>
            <div className="confetti" style={{ left: '40%', backgroundColor: '#FFEB3B', width: '8px', height: '8px', animationDelay: '0.3s' }}></div>
            <div className="confetti" style={{ left: '60%', backgroundColor: '#2196F3', width: '10px', height: '10px', animationDelay: '0.5s' }}></div>
            <div className="confetti" style={{ left: '80%', backgroundColor: '#4CAF50', width: '14px', height: '14px', animationDelay: '0.7s' }}></div>
            <div className="confetti" style={{ left: '30%', backgroundColor: '#9C27B0', width: '9px', height: '9px', animationDelay: '0.9s' }}></div>
            <div className="confetti" style={{ left: '70%', backgroundColor: '#FF9800', width: '11px', height: '11px', animationDelay: '1.1s' }}></div>
          </div>
        ) : isSectionTitle ? (
          <div className="text-white font-heading text-title mb-10 max-w-4xl text-center transform transition-all duration-500 ease-in-out animate-title shadow-text">
            {currentSentence.replace(/\*\*/g, '')}
          </div>
        ) : (
          <div className="text-white font-body text-body-large mb-16 max-w-4xl text-center transform transition-all duration-500 ease-in-out animate-fadeIn shadow-text">
            {currentSentence}
          </div>
        )}

        {/* Map display - enhanced approach */}
        {showMap && currentLocation && (
          <div className="w-full max-w-4xl mb-12 z-10 transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-t-lg text-white text-center font-medium font-body text-subtitle shadow-text">
              <span className="mr-3 text-4xl">📍</span> {currentLocation}
            </div>
            <div className="rounded-b-lg overflow-hidden shadow-2xl border border-white border-opacity-20">
              {/* Create a new map component instance each time with a unique key */}
              {React.createElement(LocationMap, {
                location: currentLocation,
                readOnly: true,
                key: `map-${currentLocation}-${currentSentenceIndex}`
              })}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-12 z-10 flex flex-col items-center">
          {/* Volume control */}
          <div className="mb-8 flex items-center bg-black bg-opacity-30 px-6 py-4 rounded-full">
            <span className="text-white mr-4 text-3xl">{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value);
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume / 100;
                }
              }}
              className="w-48 h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white ml-4 text-xl font-body">{volume}%</span>
          </div>

          {/* Presentation controls */}
          {!isPlaying ? (
            <button
              onClick={startPresentation}
              className="px-10 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-3xl font-medium font-heading hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="mr-3 text-3xl">✨</span> Start Presentation
            </button>
          ) : (
            <div className="flex space-x-4">
              {isPaused ? (
                <button
                  onClick={resumePresentation}
                  className="px-8 py-5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-2xl font-medium font-heading hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="mr-3 text-2xl">▶️</span> Resume
                </button>
              ) : (
                <button
                  onClick={pausePresentation}
                  className="px-8 py-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full text-2xl font-medium font-heading hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <span className="mr-3 text-2xl">⏸️</span> Pause
                </button>
              )}
              <button
                onClick={stopPresentation}
                className="px-8 py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-2xl font-medium font-heading hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="mr-3 text-2xl">⏹️</span> Stop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedProfilePresentation;
