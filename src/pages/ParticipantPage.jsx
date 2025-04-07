import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import WelcomeScreen from '../components/participant/WelcomeScreen';
import AvatarSelection from '../components/participant/AvatarSelection';
import Questionnaire from '../components/participant/Questionnaire';
import CompletionScreen from '../components/participant/CompletionScreen';
import Loading from '../components/common/Loading';

const ParticipantPage = () => {
  const [step, setStep] = useState('welcome');
  const [participantInfo, setParticipantInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleStart = (name) => {
    setParticipantInfo({ name });
    setStep('avatar');
  };
  
  const handleSelectAvatar = (avatar) => {
    setParticipantInfo({
      ...participantInfo,
      avatar
    });
    setStep('questionnaire');
  };
  
  const handleQuestionnaireComplete = async (answers) => {
    setIsSubmitting(true);
    
    try {
      // Save to Firebase
      await addDoc(collection(db, 'participants'), {
        name: participantInfo.name,
        avatar: participantInfo.avatar,
        timestamp: new Date(),
        answers
      });
      
      setStep('completion');
    } catch (error) {
      console.error("Error saving participant data: ", error);
      alert("There was an error saving your responses. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitting) {
    return <Loading />;
  }
  
  switch (step) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStart} />;
    
    case 'avatar':
      return <AvatarSelection onSelectAvatar={handleSelectAvatar} />;
    
    case 'questionnaire':
      return <Questionnaire 
        onComplete={handleQuestionnaireComplete} 
        participantInfo={participantInfo} 
      />;
    
    case 'completion':
      return <CompletionScreen 
        userName={participantInfo.name} 
        avatar={participantInfo.avatar} 
      />;
    
    default:
      return <WelcomeScreen onStart={handleStart} />;
  }
};

export default ParticipantPage;
