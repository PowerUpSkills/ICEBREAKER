import React from 'react';

const TailwindTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
        <p className="text-gray-600 mb-6">This component is testing if Tailwind CSS is working properly.</p>
        
        <div className="space-y-4">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            This is a red alert box
          </div>
          
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            This is a green success box
          </div>
          
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
            This is a blue info box
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Blue Button
            </button>
            
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Green Button
            </button>
            
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Red Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
