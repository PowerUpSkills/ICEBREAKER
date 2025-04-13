import React, { useState, useEffect } from 'react';
import LocationMap from '../common/LocationMap';
import LocationAutocomplete from '../common/LocationAutocomplete';

const Questionnaire = ({ onComplete, participantInfo }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Initialize answers with participant info
  useEffect(() => {
    if (participantInfo) {
      setAnswers({
        name: participantInfo.name,
        avatar: participantInfo.avatar,
        ...answers
      });
    }
  }, [participantInfo]);

  // Sample questions array with different types
  const questions = [
    {
      id: 'role',
      type: 'text',
      question: "What's your role in the team?",
      placeholder: "e.g., Frontend Developer, Tester, Product Owner"
    },
    {
      id: 'birthplace',
      type: 'location',
      question: "Where were you born? (This will be your Origin Story location)",
      placeholder: "e.g., Tokyo, Japan"
    },
    {
      id: 'location5',
      type: 'location',
      question: "Where were you living 5 years ago? (This will be your Recent Journey location)",
      placeholder: "e.g., San Francisco, USA"
    },
    {
      id: 'location10',
      type: 'location',
      question: "Where were you living 10 years ago? (This will be your Early Adventures location)",
      placeholder: "e.g., Berlin, Germany"
    },
    {
      id: 'workspace',
      type: 'multipleChoice',
      question: "My ideal workspace is:",
      options: [
        "Perfectly organized, everything in its place",
        "Creative chaos - I know where everything is",
        "Minimalist - just the essentials",
        "Constantly changing based on what I'm working on"
      ]
    },
    {
      id: 'challenge',
      type: 'multipleChoice',
      question: "When tackling a new challenge, I usually:",
      options: [
        "Research thoroughly before making any decisions",
        "Dive right in and figure it out as I go",
        "Collaborate with others to brainstorm solutions",
        "Draw from past experience with similar challenges"
      ]
    },
    {
      id: 'productivity',
      type: 'multipleChoice',
      question: "My productivity fuel of choice is:",
      options: [
        "Coffee - the stronger, the better",
        "Tea - sophisticated and calming",
        "Energy drinks - maximum caffeine",
        "Water and healthy snacks",
        "Pure determination (no caffeine needed)"
      ]
    },
    {
      id: 'superpower',
      type: 'multipleChoice',
      question: "If I could have any superpower for work, I'd choose:",
      options: [
        "Time manipulation (pause, rewind, fast-forward)",
        "Mind reading (understand what others are really thinking)",
        "Super-learning (master any skill instantly)",
        "Teleportation (no commute, lunch anywhere)",
        "Clone myself (be in multiple meetings at once)"
      ]
    },
    {
      id: 'hobby',
      type: 'multipleChoice',
      question: "Outside of work, you might find me:",
      options: [
        "Exploring the outdoors (hiking, biking, etc.)",
        "Enjoying creative hobbies (art, music, writing)",
        "Playing video games or board games",
        "Learning something new (courses, languages)",
        "Spending time with family/friends",
        "Binge-watching shows or reading"
      ]
    },
    {
      id: 'emoji',
      type: 'multipleChoice',
      question: "The emoji that best represents me is:",
      options: [
        "😊 Happy face",
        "🤔 Thinking face",
        "🚀 Rocket",
        "💡 Light bulb",
        "🧩 Puzzle piece",
        "🌟 Star",
        "🧠 Brain",
        "🏃 Runner"
      ]
    },
    {
      id: 'project',
      type: 'text',
      question: "A project domain I've worked on that I found fascinating was:",
      placeholder: "e.g., AI-powered recommendation system"
    },
    {
      id: 'tool',
      type: 'text',
      question: "A technology or tool I really enjoyed working with:",
      placeholder: "e.g., React.js, Docker, Figma"
    },
    {
      id: 'tip',
      type: 'text',
      question: "If I could share one professional tip with the team, it would be:",
      placeholder: "e.g., Always write tests before code"
    },
    {
      id: 'funfact',
      type: 'text',
      question: "A fun fact about me that might surprise you is:",
      placeholder: "e.g., I was a chess champion in high school"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <div className="mt-4">
            <input
              type="text"
              className="form-input"
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          </div>
        );

      case 'location':
        return (
          <div className="mt-4 space-y-4">
            <LocationAutocomplete
              value={answers[currentQuestion.id] || ''}
              onChange={(value) => handleAnswerChange(value)}
              placeholder={currentQuestion.placeholder}
              className="w-full"
            />
            {answers[currentQuestion.id] && (
              <LocationMap location={answers[currentQuestion.id]} />
            )}
          </div>
        );

      case 'multipleChoice':
        return (
          <div className="mt-4 space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerChange(option)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all-300
                  ${answers[currentQuestion.id] === option
                    ? 'bg-primary-100 border-primary-300 border'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}
                `}
              >
                <span className="text-gray-800">{option}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="w-full max-w-2xl card card-body animate-scale-in">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        {renderQuestionInput()}

        <div className="mt-8 flex justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn btn-outline"
          >
            Previous
          </button>

          <button
            onClick={goToNextQuestion}
            disabled={!answers[currentQuestion.id]}
            className="btn btn-primary"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
