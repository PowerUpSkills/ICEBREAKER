import React, { useState } from 'react';
import Groq from 'groq-sdk';

const GroqTest = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const testGroqApi = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Testing Groq API...');

      const groq = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: 'Hello, can you confirm that you are the Groq API? Please respond with a short confirmation.',
          },
        ],
        model: 'llama3-70b-8192',
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
      });

      const response = chatCompletion.choices[0]?.message?.content || 'No response';
      console.log('Groq API response:', response);

      setResult(response);
    } catch (error) {
      console.error('Error testing Groq API:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Groq API Test</h1>

        <button
          onClick={testGroqApi}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? 'Testing...' : 'Test Groq API'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h2 className="font-bold text-green-800 mb-2">Response:</h2>
            <p className="text-green-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroqTest;
