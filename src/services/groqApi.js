import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true, // Note: Only for client-side use in development
});

/**
 * Generate a team member profile using Groq API
 *
 * @param {Object} participantData - Participant information including answers
 * @returns {Promise<string>} - The generated profile text
 */
export const generateGroqProfile = async (participantData) => {
  try {
    console.log('Starting Groq profile generation for:', participantData.name);

    // Create a detailed prompt based on participant data
    const prompt = createDetailedPrompt(participantData);
    console.log('Prompt created for Groq API');

    // Call Groq API
    console.log('Calling Groq API with model: llama3-70b-8192');
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a creative profile writer who creates fun, superhero-style profiles for team members. Your profiles are engaging, positive, and highlight the unique qualities of each person.'
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
    });

    console.log('Received response from Groq API:', {
      model: chatCompletion.model,
      usage: chatCompletion.usage,
      responseLength: chatCompletion.choices[0]?.message?.content?.length || 0
    });

    // Extract and format the response
    const profileText = chatCompletion.choices[0]?.message?.content || '';
    console.log('Profile text generated successfully');
    return formatProfile(profileText, participantData);
  } catch (error) {
    console.error('Error generating profile with Groq:', error);
    console.log('Falling back to template-based generation');
    // Fall back to template-based generation if Groq API fails
    return generateTemplateProfile(participantData);
  }
};

/**
 * Create a detailed prompt for the Groq model
 */
function createDetailedPrompt(participantData) {
  return `Create a fun profile for a team member named ${participantData.name} who works as a ${participantData.answers.role}.

Background information:
- They were born in ${participantData.answers.birthplace}
- They lived in ${participantData.answers.location10} 10 years ago
- They lived in ${participantData.answers.location5} 5 years ago
- Their preferred workspace is "${participantData.answers.workspace}"
- When facing challenges, they "${participantData.answers.challenge}"
- They fuel their productivity with "${participantData.answers.productivity}"
- If they could have a superpower, they would choose "${participantData.answers.superpower}"
- Outside of work, they enjoy "${participantData.answers.hobby}"
- The emoji that represents them is "${participantData.answers.emoji}"
- A fascinating project they worked on was "${participantData.answers.project}"
- Their favorite tool or technology is "${participantData.answers.tool}"
- A professional tip they would share is "${participantData.answers.tip}"
- A fun fact about them is "${participantData.answers.funfact}"

Write a fun profile with the following sections ONLY:

**ORIGIN STORY:**
[Origin story content that incorporates their birthplace - ${participantData.answers.birthplace}. Make this a dedicated section about their birthplace with specific details about the location.]

**EARLY ADVENTURES:**
[A dedicated section about their time in ${participantData.answers.location10} 10 years ago. Include specific details about this location and what they might have experienced there.]

**RECENT JOURNEY:**
[A dedicated section about their time in ${participantData.answers.location5} 5 years ago. Include specific details about this location and what they might have experienced there.]

**POWER STATS:**
- **Work Style:** [Work style]
- **Problem Solving:** [Problem solving approach]
- **Communication:** [Communication style]

**SPECIAL ABILITIES:**
- [Special ability 1]
- [Special ability 2]
- [Special ability 3]

**PREFERRED WEAPON:**
[Weapon/tool description]

**LEISURE QUESTS:**
[Off-duty activities]

**SECRET KNOWLEDGE:**
[Fun fact]

**FAMOUS QUOTE:**
"[Quote]"

**TEAM COMPATIBILITY:**
[Team compatibility description]

IMPORTANT INSTRUCTIONS:
1. Do NOT create a superhero name or title - I will handle that part
2. Do NOT include any percentages in the profile
3. Do NOT add any introduction or conclusion - start directly with the ORIGIN STORY section
4. Keep it fun, positive, and professional
5. Focus on their actual role (${participantData.answers.role}) rather than inventing a superhero equivalent
6. VERY IMPORTANT: Create THREE SEPARATE LOCATION SECTIONS as outlined above (Origin Story, Early Adventures, Recent Journey) - each focusing on a different location from their history. Each section should be detailed enough to allow time for a map to be displayed during presentation.`;
}

/**
 * Format and clean up the AI response
 */
function formatProfile(aiResponse, participantData) {
  // Extract the emoji icon from the emoji string (e.g., "🚀 Rocket" -> "🚀")
  const emojiIcon = participantData.answers.emoji.split(' ')[0];

  // Start with a clean profile structure
  let formattedResponse = `## TEAM MEMBER PROFILE: ${participantData.name.toUpperCase()}\n\n`;

  // Add the first paragraph with the exact role from participant data
  formattedResponse += `${emojiIcon} **${participantData.answers.role.toUpperCase()}**\n\n`;
  formattedResponse += `*${participantData.name} is empowering the TechTOM Team by being a ${participantData.answers.role}*\n\n`;

  // Process the AI response to extract useful sections
  let aiContent = aiResponse;

  // Remove any superhero name or title sections that might override our format
  aiContent = aiContent.replace(/^#+ .*$/gm, ''); // Remove any headings
  aiContent = aiContent.replace(/^\*\*.*CRUSADER.*\*\*$/gm, ''); // Remove superhero titles
  aiContent = aiContent.replace(/^\*Specializes in.*\*$/gm, ''); // Remove specialization line

  // Add the remaining AI content
  formattedResponse += aiContent;

  // If the AI response is missing key location sections, add them
  if (!formattedResponse.includes("ORIGIN STORY")) {
    formattedResponse += `\n\n**ORIGIN STORY:**\nBorn in ${participantData.answers.birthplace}, ${participantData.name}'s journey began in a place known for its unique culture and atmosphere. The environment of ${participantData.answers.birthplace} shaped their early perspectives and instilled values that would later become fundamental to their professional approach.`;
  }

  if (!formattedResponse.includes("EARLY ADVENTURES")) {
    formattedResponse += `\n\n**EARLY ADVENTURES:**\nAbout a decade ago, ${participantData.name} found themselves in ${participantData.answers.location10}, a significant chapter in their life journey. During this time in ${participantData.answers.location10}, they developed key skills and experiences that would later prove invaluable. The local environment and culture of ${participantData.answers.location10} left a lasting impression on their work ethic.`;
  }

  if (!formattedResponse.includes("RECENT JOURNEY")) {
    formattedResponse += `\n\n**RECENT JOURNEY:**\nFive years ago, ${participantData.name}'s path led to ${participantData.answers.location5}, where they encountered new challenges and opportunities. Their time in ${participantData.answers.location5} was transformative, providing them with fresh perspectives and approaches that they bring to the team today. The unique aspects of ${participantData.answers.location5} continue to influence their problem-solving methods.`;
  }

  // Make sure there's a quote
  if (!formattedResponse.includes("QUOTE") && !formattedResponse.includes("quote")) {
    formattedResponse += `\n\n**FAMOUS QUOTE:**\n"${participantData.answers.tip}"`;
  }

  // Remove any percentages that might have been generated
  formattedResponse = formattedResponse.replace(/\(\d+%\)/g, '');

  // Add the TechTOM Team welcome message at the end
  formattedResponse += `\n\n---\n\n**We are happy to have you in our TechTOM Team ${participantData.name}. Let's build the future together!**`;

  return formattedResponse;
}

/**
 * Generate a template-based profile as a fallback
 */
function generateTemplateProfile(participantData) {
  // Extract the emoji icon from the emoji string (e.g., "🚀 Rocket" -> "🚀")
  const emojiIcon = participantData.answers.emoji.split(' ')[0];

  // Generate a "superhero" title based on role and selected emoji
  let superTitle = '';
  const emoji = participantData.answers.emoji.split(' ')[1] || '';

  if (emoji) {
    superTitle = `THE ${emoji.toUpperCase()} ${participantData.answers.role.toUpperCase()}`;
  } else {
    superTitle = `THE INCREDIBLE ${participantData.answers.role.toUpperCase()}`;
  }

  return `
## TEAM MEMBER PROFILE: ${participantData.name.toUpperCase()}

${emojiIcon} **${participantData.answers.role.toUpperCase()}**

*${participantData.name} is empowering the TechTOM Team by being a ${participantData.answers.role}*

**ORIGIN STORY:**
Born in ${participantData.answers.birthplace}, ${participantData.name}'s journey began in a place known for its unique culture and atmosphere. The environment of ${participantData.answers.birthplace} shaped their early perspectives and instilled values that would later become fundamental to their professional approach.

**EARLY ADVENTURES:**
About a decade ago, ${participantData.name} found themselves in ${participantData.answers.location10}, a significant chapter in their life journey. During this time in ${participantData.answers.location10}, they developed key skills and experiences that would later prove invaluable. The local environment and culture of ${participantData.answers.location10} left a lasting impression on their work ethic.

**RECENT JOURNEY:**
Five years ago, ${participantData.name}'s path led to ${participantData.answers.location5}, where they encountered new challenges and opportunities. Their time in ${participantData.answers.location5} was transformative, providing them with fresh perspectives and approaches that they bring to the team today. The unique aspects of ${participantData.answers.location5} continue to influence their problem-solving methods.

**POWER STATS:**
- **Work Style:** ${participantData.answers.workspace}
- **Problem Solving:** ${participantData.answers.challenge}
- **Communication:** Visual Explanations

**SPECIAL ABILITIES:**
- Can transform ${participantData.answers.productivity.split(' ')[0].toLowerCase()} into code at remarkable efficiency
- Possesses the rare talent of ${participantData.answers.superpower.split('(')[0].trim().toLowerCase()}
- Specialized in ${participantData.answers.project}

**PREFERRED WEAPON:**
The mighty keyboard, fueled by ${participantData.answers.productivity.toLowerCase()}

**LEISURE QUESTS:**
When not coding, ${participantData.name} can be found ${participantData.answers.hobby.toLowerCase()}.

**SECRET KNOWLEDGE:**
${participantData.answers.funfact}

**FAMOUS QUOTE:**
"${participantData.answers.tip}"

**TEAM COMPATIBILITY:**
Works exceptionally well with creative thinkers and detail-oriented planners alike.

---

**We are happy to have you in our TechTOM Team ${participantData.name}. Let's build the future together!**
  `;
}
