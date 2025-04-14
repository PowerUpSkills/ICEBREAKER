# Team Icebreaker App: Technology Stack Overview

## Core Technologies

### Frontend Framework
- **React**: The application is built using React (v18.2.0), a JavaScript library for building user interfaces with component-based architecture.
- **React Router**: Uses React Router (v6.19.0) for client-side routing, enabling navigation between different views without page reloads.

### Styling and UI
- **Tailwind CSS**: The primary styling framework (v3.3.5) that provides utility-first CSS classes for rapid UI development.
- **@tailwindcss/typography**: Extension plugin for Tailwind that adds typographic styles for content-rich components.
- **CSS Modules**: Component-specific styles are organized in separate CSS files for better maintainability.

### Build Tools
- **Vite**: Modern build tool and development server (v5.0.0) that offers fast hot module replacement and efficient production builds.
- **PostCSS**: Used for processing CSS with plugins like Autoprefixer to ensure cross-browser compatibility.

### State Management
- **React Hooks**: Leverages React's built-in hooks (useState, useEffect, useRef) for state management and side effects.
- **Context API**: Used for sharing state across components without prop drilling.

### Maps and Geolocation
- **Leaflet**: Open-source JavaScript library (v1.9.4) for interactive maps.
- **React Leaflet**: React components for Leaflet maps (v4.2.1).
- **Custom Geocoding Service**: Implements a geocoding proxy service for location search and validation.

## Backend and Data Services

### Firebase
- **Firebase Firestore**: NoSQL cloud database for storing participant data and responses.
- **Firebase Hosting**: Deployment platform for hosting the web application.
- **Firebase Authentication**: (Potentially used) for admin authentication.

### AI Integration
- **Groq API**: Integration with Groq's LLM API (using llama3-70b-8192 model) for generating AI profiles of team members.
- **Custom AI Profile Generator**: Service that formats participant data into prompts for the AI model.

## Media and Animations

### Audio
- **Web Audio API**: Used for background music playback during presentations.
- **Custom Audio Controls**: Volume control and playback management.

### Animations and Visual Effects
- **CSS Animations**: Custom keyframe animations for visual effects.
- **Canvas Confetti**: Library for creating confetti effects during presentations.
- **Custom Animation System**: For word-by-word text animations and transitions.

## Development Tools

### Package Management
- **npm**: Node package manager for dependency management.

### Code Organization
- **ESM Modules**: Modern JavaScript module system for better code organization.
- **Service-based Architecture**: Functionality is organized into service modules (geocoding, AI, audio).

### Development Environment
- **Vite Dev Server**: Fast development server with hot module replacement.
- **Browser DevTools**: For debugging and testing.

## Deployment

### Hosting
- **Firebase Hosting**: Production deployment platform with global CDN.
- **Single-page Application Configuration**: URL rewriting for client-side routing.

### Build Process
- **Vite Build**: Production build process that optimizes assets.
- **Static Asset Handling**: Public directory for static assets like audio files.

## Key Features Implementation

### Participant Experience
- **Interactive Questionnaire**: Multi-step form with various question types.
- **Location Selection**: Map-based location selection with geocoding.
- **Avatar Selection**: Custom avatar selection interface.

### Facilitator Dashboard
- **Team Member Overview**: Dashboard for viewing all participants.
- **Question Navigation**: Interface for exploring different aspects of team members.
- **AI Profile Generation**: Integration with Groq API for generating team member profiles.

### Presentation Mode
- **Animated Text Display**: Custom animation system for presenting text.
- **Map Integration**: Dynamic map display for location-based information.
- **Audio Integration**: Background music and playback controls.
- **Visual Effects**: Confetti and other visual enhancements.

## Technical Highlights

1. **Responsive Design**: Adapts to different screen sizes using Tailwind's responsive utilities.
2. **Progressive Enhancement**: Core functionality works without advanced features like animations.
3. **Component Reusability**: Common components like LocationMap are reused across the application.
4. **Service Abstraction**: External services are abstracted behind service modules for easier maintenance.
5. **Modern JavaScript**: Uses ES6+ features throughout the codebase.

## Deployment Information

The application is deployed and accessible at:
- **Main URL**: https://team-icebreaker-app.web.app
- **Alternative URL**: https://team-icebreaker-app.firebaseapp.com

### Access Points
- **Participant Frontend**: https://team-icebreaker-app.web.app/
- **Admin/Facilitator Frontend**: https://team-icebreaker-app.web.app/admin
