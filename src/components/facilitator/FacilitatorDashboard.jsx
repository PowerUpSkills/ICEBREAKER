import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { generateProfile } from '../../services/aiProfile';
import LocationMap from '../common/LocationMap';
import AnimatedProfilePresentation from './AnimatedProfilePresentation';
import StyledAIProfile from './StyledAIProfile';
import './facilitatorDashboard.css';

const FacilitatorDashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [aiProfile, setAiProfile] = useState(null);
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPresentation, setShowPresentation] = useState(false);

  // Fetch participants data from Firestore
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsCollection = collection(db, 'participants');
        const participantsSnapshot = await getDocs(participantsCollection);
        const participantsList = participantsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setParticipants(participantsList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching participants: ", error);
        setIsLoading(false);
      }
    };

    fetchParticipants();
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

  // Questions to display in the right sidebar
  const questions = [
    { id: 'basics', label: 'Name & Role' },
    { id: 'locations', label: 'Locations' },
    { id: 'workspace', label: 'Workspace Style' },
    { id: 'challenge', label: 'Approach to Challenges' },
    { id: 'productivity', label: 'Productivity Fuel' },
    { id: 'superpower', label: 'Chosen Superpower' },
    { id: 'hobby', label: 'Outside Work Activities' },
    { id: 'emoji', label: 'Representative Emoji' },
    { id: 'project', label: 'Fascinating Project' },
    { id: 'tool', label: 'Favorite Technology' },
    { id: 'tip', label: 'Professional Tip' },
    { id: 'funfact', label: 'Fun Fact' }
  ];

  // Generate AI profile for selected participant using Groq
  const handleGenerateProfile = async () => {
    if (!selectedParticipant) return;

    setIsGeneratingProfile(true);

    try {
      const participant = participants.find(p => p.id === selectedParticipant);
      const profileText = await generateProfile(participant);
      setAiProfile(profileText);
    } catch (error) {
      console.error("Error generating profile:", error);
      // Set a fallback profile if API fails
      const participant = participants.find(p => p.id === selectedParticipant);
      setAiProfile(`
## TEAM MEMBER PROFILE: ${participant.name.toUpperCase()}

**THE ${participant.answers.emoji.split(' ')[0]} ${participant.answers.role.toUpperCase()}**
*Specializes in ${participant.answers.challenge.toLowerCase()} approaches*

**ORIGIN STORY:**
Born in ${participant.answers.birthplace}, ${participant.name} has journeyed through ${participant.answers.location10} (10 years ago) and ${participant.answers.location5} (5 years ago) before joining our team.

**POWER STATS:**
- **Work Style:** ${participant.answers.workspace}
- **Problem Solving:** ${participant.answers.challenge}
- **Communication:** Visual Explanations

**SPECIAL ABILITIES:**
- Can transform ${participant.answers.productivity.split(' ')[0].toLowerCase()} into code at remarkable efficiency
- Possesses the rare talent of ${participant.answers.superpower.split('(')[0].trim().toLowerCase()}
- Specialized in ${participant.answers.project}

**PREFERRED WEAPON:**
The mighty keyboard, fueled by ${participant.answers.productivity.toLowerCase()}

**LEISURE QUESTS:**
When not coding, ${participant.name} can be found ${participant.answers.hobby.toLowerCase()}.

**SECRET KNOWLEDGE:**
${participant.answers.funfact}

**FAMOUS QUOTE:**
"${participant.answers.tip}"
      `);
    } finally {
      setIsGeneratingProfile(false);
    }
  };

  // Start the animated presentation
  const startAnimatedPresentation = () => {
    if (aiProfile) {
      setShowPresentation(true);
    }
  };

  // This function has been removed as we no longer use text-to-speech

  // Render content based on selected participant and active question
  const renderContent = () => {
    if (aiProfile) {
      // Render the AI profile
      return (
        <div className="dashboard-ai-profile">
          <div className="dashboard-ai-header">
            <h2 className="dashboard-ai-title">AI Generated Profile</h2>
            <button
              onClick={() => setAiProfile(null)}
              className="dashboard-ai-close"
            >
              ⨉
            </button>
          </div>

          <div className="dashboard-ai-content">
            <StyledAIProfile profileText={aiProfile} />
          </div>

          <div className="dashboard-ai-actions">
            <button
              onClick={() => speakProfile(aiProfile)}
              className="dashboard-button dashboard-button-secondary"
            >
              🔊 Read Aloud
            </button>
            <button
              onClick={startAnimatedPresentation}
              className="dashboard-button dashboard-button-primary"
            >
              ✨ Presentation Mode
            </button>
          </div>
        </div>
      );
    }

    if (!selectedParticipant) {
      // No participant selected
      return (
        <div className="dashboard-empty-state">
          <div className="dashboard-empty-icon">👈</div>
          <h2 className="dashboard-empty-title">Select a Team Member</h2>
          <p className="dashboard-empty-text">
            Click on a team member's avatar to reveal their responses.
          </p>
        </div>
      );
    }

    if (!activeQuestion) {
      // Participant selected but no question selected
      return (
        <div className="dashboard-empty-state">
          <div className="dashboard-empty-icon">👉</div>
          <h2 className="dashboard-empty-title">Select a Question</h2>
          <p className="dashboard-empty-text">
            Click on a question from the right panel to reveal the answer.
          </p>
        </div>
      );
    }

    // Question and participant selected
    const participant = participants.find(p => p.id === selectedParticipant);
    if (!participant) return null;

    // Render based on question type
    switch (activeQuestion) {
      case 'basics':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Name & Role</h3>
            <div className="flex items-center">
              <div className="text-5xl mr-4">{getEmoji(participant.avatar)}</div>
              <div>
                <div className="text-2xl font-bold">{participant.name}</div>
                <div className="text-xl text-gray-600">{participant.answers.role}</div>
              </div>
            </div>
          </div>
        );

      case 'locations':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Location History</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="font-semibold">Born in:</div>
                <div className="text-lg">{participant.answers.birthplace}</div>
                {participant.answers.birthplace && (
                  <div className="mt-2">
                    <LocationMap location={participant.answers.birthplace} readOnly={true} />
                  </div>
                )}
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="font-semibold">5 years ago:</div>
                <div className="text-lg">{participant.answers.location5}</div>
                {participant.answers.location5 && (
                  <div className="mt-2">
                    <LocationMap location={participant.answers.location5} readOnly={true} />
                  </div>
                )}
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <div className="font-semibold">10 years ago:</div>
                <div className="text-lg">{participant.answers.location10}</div>
                {participant.answers.location10 && (
                  <div className="mt-2">
                    <LocationMap location={participant.answers.location10} readOnly={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        // For all other questions, render a simple card
        const questionObj = questions.find(q => q.id === activeQuestion);
        const answer = participant.answers[activeQuestion];

        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">{questionObj?.label}</h3>
            <div className="text-lg">{answer}</div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {showPresentation && selectedParticipant && (
        <AnimatedProfilePresentation
          profileText={aiProfile}
          participantData={participants.find(p => p.id === selectedParticipant)}
          onClose={() => setShowPresentation(false)}
        />
      )}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <h1 className="dashboard-title">Team Icebreaker Dashboard</h1>
            <div className="dashboard-subtitle">
              Facilitator: Janni (Product Owner)
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="dashboard-loading">
            <div className="dashboard-spinner"></div>
          </div>
        ) : (
          <div className="dashboard-grid">
            {/* Left sidebar - Participant selection */}
            <div className="dashboard-sidebar">
              <div className="dashboard-sidebar-card">
                <h2 className="dashboard-sidebar-title">Team</h2>

                <div className="dashboard-team-list">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      onClick={() => setSelectedParticipant(participant.id)}
                      className={`dashboard-team-member ${selectedParticipant === participant.id ? 'selected' : ''}`}
                    >
                      <div className="dashboard-team-avatar">{getEmoji(participant.avatar)}</div>
                      <div className="dashboard-team-name">{participant.name}</div>
                      <div className="dashboard-team-role">{participant.answers.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="dashboard-main">
              <div className="dashboard-main-card">
                {renderContent()}

                {selectedParticipant && !aiProfile && (
                  <div className="dashboard-generate-button">
                    <button
                      onClick={handleGenerateProfile}
                      disabled={isGeneratingProfile}
                      className="dashboard-generate"
                    >
                      {isGeneratingProfile ? (
                        <>
                          <div className="dashboard-generate-spinner"></div>
                          Generating Profile...
                        </>
                      ) : (
                        <>✨ Generate AI Profile</>
                      )}
                    </button>
                  </div>
                )}

                {selectedParticipant && aiProfile && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={startAnimatedPresentation}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg flex items-center"
                    >
                      <span className="mr-2">✨</span> Start Presentation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar - Question selection */}
            <div className="dashboard-questions">
              <div className="dashboard-questions-card">
                <h2 className="dashboard-questions-title">Questions</h2>

                <div className="dashboard-questions-list">
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => selectedParticipant && setActiveQuestion(question.id)}
                      className={`dashboard-question-item ${activeQuestion === question.id ? 'selected' : ''} ${!selectedParticipant ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {question.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitatorDashboard;
