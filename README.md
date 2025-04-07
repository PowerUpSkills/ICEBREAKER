# Team Icebreaker App

A web application for team building activities that helps new team members integrate by collecting fun facts and professional experiences, then allowing a facilitator to present this information during a virtual session.

## Features

- Avatar selection for participants
- Multi-step questionnaire with multiple-choice and text questions
- Location history visualization 
- AI-generated fun profiles for each team member
- Text-to-speech capability for introducing team members

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A Firebase account for the database

### Installation

1. Clone this repository or download the source code:

```bash
git clone https://github.com/yourusername/team-icebreaker.git
cd team-icebreaker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase and (optionally) Hugging Face API credentials:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# For AI profile generation (optional)
REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_api_key
# Or if using OpenAI
# REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

4. Update the Firebase configuration in `src/services/firebase.js` with your project details.

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Usage

### For Participants

1. Share the main URL with team members
2. They enter their name and proceed through the questionnaire
3. Each participant selects an avatar and answers all questions
4. Their responses are saved to Firebase

### For the Facilitator

1. Access the admin dashboard via `/admin` (e.g., `http://localhost:5173/admin`)
2. Enter the password (`teamicebreaker123`)
3. When conducting the team meeting:
   - Share your screen showing the dashboard
   - Select participants one by one
   - Click through questions to reveal their answers
   - Generate AI profiles for entertaining introductions
   - Use the text-to-speech feature for a fun "announcer voice" effect

## Deployment to Netlify

1. Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Create a production build:

```bash
npm run build
```

3. Deploy to Netlify using one of these methods:
   - Connect your GitHub repository to Netlify for automatic deployments
   - Use the Netlify CLI: `netlify deploy --prod`
   - Drag and drop the `dist` folder to Netlify's manual deploy area

4. Remember to set your environment variables in the Netlify dashboard.

## Customization

- Modify questions in `src/components/participant/Questionnaire.jsx`
- Change the design by updating the Tailwind CSS classes
- Add more avatar options in `src/components/participant/AvatarSelection.jsx`
- Customize the AI profile prompt in `src/services/aiProfile.js`

## Security Notes

- The admin password is hardcoded for simplicity. In a production environment, you should implement proper authentication.
- Geocoding APIs often require credit card information. Consider implementing a simpler location selection method if you don't want to use a paid service.
- The Web Speech API is not supported in all browsers. Test on your target devices before the actual session.

## AI Integration Notes

Since AI services change their APIs and model availability regularly, before implementation, check the latest documentation for:
- Hugging Face Inference API: https://huggingface.co/docs/api-inference/
- OpenAI API: https://platform.openai.com/docs/

The application includes a fallback template-based profile generation if API calls fail.

## License

MIT

## Acknowledgements

This project was created using:
- React.js for UI components
- Vite for fast development and builds
- Tailwind CSS for styling
- Firebase Firestore for data storage
- React Router for navigation
- React Leaflet for map visualization
- Canvas Confetti for visual effects
- Hugging Face API for AI profile generation
- Web Speech API for text-to-speech functionality

## Future Enhancements

Potential improvements for future versions:
- Proper authentication for facilitator login
- Multiple session support
- Participant image uploads instead of emoji avatars
- More interactive map visualization
- Export/import functionality for session data
- Customizable questions for different teams
- Integration with team communication tools (Slack, Teams)
- Mobile-optimized facilitator view
