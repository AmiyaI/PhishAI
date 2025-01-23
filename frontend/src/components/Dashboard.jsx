import React, { useState } from 'react';
import { Shield, Brain, Cloud, LogOut, User, BarChart2, Settings, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ theme, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('training');
  
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <nav className={`border-b border-purple-500/30 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-purple-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                PhishAI <span className="text-purple-400">Training</span>
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('training')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'training'
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Training
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'progress'
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'achievements'
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Achievements
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Settings
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Content sections will go here */}
      </div>
    </div>
  );
};

export default Dashboard;