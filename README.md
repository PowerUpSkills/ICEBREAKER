# Team Icebreaker App

A modern web application for team building activities that helps new team members integrate by collecting fun facts and professional experiences, then allowing a facilitator to present this information during a virtual session with an engaging, animated presentation mode.

## Features

- Avatar selection for participants
- Multi-step questionnaire with multiple-choice and text questions
- Location history visualization with interactive maps
- Location autocomplete for reliable geocoding
- AI-generated fun profiles for each team member using Groq API
- Animated presentation mode with visual effects and background music
- Customizable UI with Tailwind CSS theming
- Responsive design for desktop and tablet use

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- A Firebase account for the database
- Groq API key for AI profile generation

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

3. Create a `.env` file in the root directory with your Firebase and Groq API credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# For AI profile generation (required)
VITE_GROQ_API_KEY=your_groq_api_key
```

Note: The application uses Vite as the build tool, so environment variables are prefixed with `VITE_` instead of `REACT_APP_`.

4. Update the Firebase configuration in `src/services/firebase.js` with your project details.

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

You can monitor the terminal for any errors or warnings that might occur during development. The Vite development server provides fast hot module replacement (HMR) for a smooth development experience.

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Usage

### For Participants

1. Share the main URL with team members
2. They enter their name and proceed through the questionnaire
3. Each participant selects an avatar and answers all questions
4. For location questions, they can use the autocomplete feature to find places
5. Their responses are saved to Firebase automatically

### For the Facilitator

1. Access the admin dashboard via `/admin` (e.g., `http://localhost:5173/admin`)
2. Enter the password (`teamicebreaker123`)
3. When conducting the team meeting:
   - Share your screen showing the dashboard
   - Select participants one by one
   - Click through questions to reveal their answers
   - Generate AI profiles for entertaining introductions
   - Use the "Start Presentation" button to launch the animated presentation mode
   - Control the presentation with the play, pause, and stop buttons
   - The presentation will automatically transition between sentences and show maps for locations

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

### Questionnaire
- Modify questions in `src/components/participant/Questionnaire.jsx`
- Add, remove, or change question types (text, multiple-choice, location)
- Adjust question order or grouping

### Design
- Change the design by updating the Tailwind CSS classes
- Modify the theme colors in `tailwind.config.cjs`
- Update global styles in `src/index.css`
- Customize component-specific styles in their respective CSS files

### Assets
- Add more avatar options in `src/components/participant/AvatarSelection.jsx`
- Change the background music in `src/components/audio/`
- Update animations in `src/components/facilitator/animatedPresentation.css`

### AI Integration
- Customize the AI profile prompt in `src/services/groqApi.js`
- Adjust the profile generation parameters for different styles
- Modify the profile formatting and structure

## Security Notes

- The admin password is hardcoded for simplicity. In a production environment, you should implement proper authentication.
- The application uses a local database of locations instead of external geocoding APIs to avoid API costs and rate limits.
- API keys should be kept secure and not committed to version control.
- Firebase security rules should be properly configured for production use.
- The application does not collect or store sensitive personal information.

## AI Integration Notes

The application uses the Groq API for generating team member profiles:

- Groq API documentation: https://console.groq.com/docs/quickstart
- The application is configured to use the LLaMA 3 model by default
- API calls are made through the `src/services/groqApi.js` service
- The application includes a fallback template-based profile generation if API calls fail
- Profile generation is customized to include specific formatting and content for team introductions

To update the AI model or change parameters:

1. Modify the `generateProfile` function in `src/services/groqApi.js`
2. Adjust the prompt template to change the style or content of generated profiles
3. Update the model name if you want to use a different LLM

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
- Groq API for AI profile generation
- TTSMaker for high-quality text-to-speech
- Custom animations for the presentation mode

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
- Additional presentation themes and animations
- Support for video content in profiles
- Multi-language support

## Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify your Firebase credentials in the `.env` file
   - Check Firebase console for any service disruptions
   - Ensure your IP is not blocked by Firebase security rules

2. **AI Profile Generation Fails**
   - Verify your Groq API key is correct
   - Check your Groq account for API usage limits
   - Try the fallback template-based generation

3. **Maps Not Displaying**
   - Ensure the location entered is in the database
   - Check browser console for any errors
   - Verify that the location format is correct

4. **Presentation Mode Issues**
   - Make sure your browser supports all required features
   - Check that audio files are properly loaded
   - Verify that there's enough memory for animations

### Development Tips

1. **Hot Module Replacement**
   - Vite's HMR should update components automatically
   - If changes aren't reflecting, try a full page refresh

2. **CSS Debugging**
   - Use browser dev tools to inspect Tailwind classes
   - Check for CSS specificity issues if styles aren't applying

3. **React Component Lifecycle**
   - Use React DevTools to debug component rendering
   - Check for unnecessary re-renders that might affect performance

4. **Firebase Data**
   - Use Firebase console to directly view and edit data during development
   - Enable offline persistence for better development experience

## Performance Considerations

- The application uses code splitting to reduce initial load time
- Large assets like audio files are loaded on demand
- Map tiles are loaded only when needed
- AI profile generation is cached to avoid redundant API calls
- Animation performance is optimized for modern browsers
