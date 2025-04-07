import { generateGroqProfile } from './groqApi';

/**
 * Generate an AI profile based on participant data
 *
 * @param {Object} participantData - Participant information including answers
 * @returns {Promise<string>} - The generated profile text
 */
export const generateProfile = async (participantData) => {
  console.log('generateProfile called, using Groq API for profile generation');
  // Use Groq API for profile generation
  return generateGroqProfile(participantData);
};


