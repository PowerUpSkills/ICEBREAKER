import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const CompletionScreen = ({ userName, avatar }) => {
  // Trigger confetti effect when component mounts
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Get emoji based on avatar ID
  const getEmoji = (avatarId) => {
    const emojiMap = {
      'fox': '🦊',
      'penguin': '🐧',
      'koala': '🐨',
      'cat': '🐱',
      'dog': '🐶',
      'owl': '🦉',
      'rabbit': '🐰',
      'tiger': '🐯',
      'unicorn': '🦄',
      'dragon': '🐲',
      'astronaut': '👨‍🚀',
      'scientist': '👩‍🔬'
    };

    return emojiMap[avatarId] || '🎉';
  };

  return (
    <div className="page-container">
      <div className="content-container text-center">
        <div className="text-7xl mb-6 animate-float">
          {getEmoji(avatar)}
        </div>

        <h1 className="text-3xl font-bold text-primary-600 mb-4">
          Thank You, {userName}!
        </h1>

        <p className="text-xl text-gray-700 mb-6">
          Your responses have been saved successfully.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            During our team meeting, Janni will reveal everyone's responses
            and we'll all get to know each other better!
          </p>
        </div>

        <div className="animate-pulse mb-4">
          <span className="text-2xl">✨</span>
        </div>

        <p className="text-gray-500 text-sm">
          You can close this window now or refresh to start over.
        </p>
      </div>
    </div>
  );
};

export default CompletionScreen;
