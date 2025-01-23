import React from 'react';
import { Shield, Brain, Cloud } from 'lucide-react';
import ScenarioDisplay from './ScenarioDisplay';

const Dashboard = ({ theme }) => {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Dashboard Header */}
      <div className={`border-b border-purple-500/30 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-purple-50'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            PhishAI Training Dashboard
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Training Module */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-gray-900 border-purple-500' 
              : 'bg-white border-purple-200'
          }`}>
            <Shield className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Training Scenarios
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Start Email Training
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Start Voice Training
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Start Web Training
              </button>
            </div>
          </div>

          {/* Progress Module */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-gray-900 border-purple-500' 
              : 'bg-white border-purple-200'
          }`}>
            <Brain className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Your Progress
            </h2>
            {/* Add progress tracking components here */}
          </div>

          {/* Resources Module */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-gray-900 border-purple-500' 
              : 'bg-white border-purple-200'
          }`}>
            <Cloud className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Learning Resources
            </h2>
            {/* Add resource links here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;