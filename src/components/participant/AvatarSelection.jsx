import React, { useState } from 'react';

const AvatarSelection = ({ onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Sample avatar options - you would replace these with actual images
  const avatars = [
    { id: 'fox', name: 'Fox', emoji: '🦊' },
    { id: 'penguin', name: 'Penguin', emoji: '🐧' },
    { id: 'koala', name: 'Koala', emoji: '🐨' },
    { id: 'cat', name: 'Cat', emoji: '🐱' },
    { id: 'dog', name: 'Dog', emoji: '🐶' },
    { id: 'owl', name: 'Owl', emoji: '🦉' },
    { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
    { id: 'tiger', name: 'Tiger', emoji: '🐯' },
    { id: 'unicorn', name: 'Unicorn', emoji: '🦄' },
    { id: 'dragon', name: 'Dragon', emoji: '🐲' },
    { id: 'astronaut', name: 'Astronaut', emoji: '👨‍🚀' },
    { id: 'scientist', name: 'Scientist', emoji: '👩‍🔬' },
  ];

  return (
    <div className="page-container">
      <div className="w-full max-w-3xl card card-body animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="section-title mb-2">Choose Your Avatar</h1>
          <p className="text-gray-600">This will represent you during our team activity</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all-300
                ${selectedAvatar === avatar.id
                  ? 'bg-primary-100 ring-2 ring-primary-500 transform scale-105'
                  : 'bg-gray-50 hover:bg-gray-100'}
              `}
            >
              <div className="text-6xl mb-2 animate-float">{avatar.emoji}</div>
              <span className="text-sm font-medium text-gray-700">{avatar.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => onSelectAvatar(selectedAvatar)}
            disabled={!selectedAvatar}
            className="btn btn-primary py-3 px-8"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection;
