import React, { useState } from 'react';
import { Shield, Brain, Cloud, LogOut, User, BarChart2, Settings, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrainingSection from './dashboard/TrainingSection';
import ProgressSection from './dashboard/ProgressSection';
import AchievementsSection from './dashboard/AchievementsSection';
import LogoutConfirmation from './LogoutConfirmation';

const Dashboard = ({ theme, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('training');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  // Settings component (you can move this to a separate file later)
  const SettingsSection = () => (
    <div className="space-y-8">
      <div className={`p-6 rounded-lg border ${
        theme === 'dark' 
          ? 'bg-gray-900 border-purple-500' 
          : 'bg-white border-purple-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Account Settings
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              value="phishai@phishai.co"
              disabled
              className={`w-full p-2 rounded-md border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-gray-400' 
                  : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Training Difficulty
            </label>
            <select
              className={`w-full p-2 rounded-md border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Email Notifications
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked className="form-checkbox text-purple-500" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Progress Updates
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked className="form-checkbox text-purple-500" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Achievement Notifications
                </span>
              </label>
            </div>
          </div>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

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
        {activeTab === 'training' && <TrainingSection theme={theme} />}
        {activeTab === 'progress' && <ProgressSection theme={theme} />}
        {activeTab === 'achievements' && <AchievementsSection theme={theme} />}
        {activeTab === 'settings' && <SettingsSection />}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <LogoutConfirmation
          theme={theme}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default Dashboard;