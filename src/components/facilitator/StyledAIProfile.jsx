import React from 'react';
import './fonts.css';

const StyledAIProfile = ({ profileText }) => {
  // Function to parse and style the profile text
  const renderStyledProfile = () => {
    if (!profileText) return null;

    // Split the profile into sections
    const lines = profileText.split('\n');
    const styledLines = [];

    let currentSection = null;

    lines.forEach((line, index) => {
      // Handle section headers (lines with ** at beginning and end)
      if (line.startsWith('**') && line.endsWith('**')) {
        currentSection = line.replace(/\*\*/g, '');
        styledLines.push(
          <h2 key={`header-${index}`} className="text-2xl font-heading font-bold text-indigo-700 mt-6 mb-3">
            {currentSection}
          </h2>
        );
      }
      // Handle list items (lines starting with -)
      else if (line.trim().startsWith('-')) {
        const content = line.trim().substring(1).trim();
        styledLines.push(
          <div key={`list-${index}`} className="flex items-start mb-2">
            <span className="mr-2 text-indigo-500">•</span>
            <span>{content}</span>
          </div>
        );
      }
      // Handle empty lines
      else if (line.trim() === '') {
        styledLines.push(<div key={`space-${index}`} className="h-2"></div>);
      }
      // Handle regular text
      else {
        styledLines.push(
          <p key={`text-${index}`} className="mb-2">
            {line}
          </p>
        );
      }
    });

    return styledLines;
  };

  return (
    <div className="styled-ai-profile">
      {renderStyledProfile()}
    </div>
  );
};

export default StyledAIProfile;
