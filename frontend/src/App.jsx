// src/App.jsx
import React, { useState } from 'react';
import { Shield, Brain, Cloud, Terminal, Server, Users, Mail, Phone, Globe, ChevronRight, PlayCircle, AlertCircle, Sun, Moon, Trophy, Book, Target, BarChart3, Award, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Alert, AlertDescription } from './components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Achievement Badge Component
const AchievementsBadge = ({ achievement, theme }) => (
  <div className={`p-4 rounded-lg border ${
    theme === 'dark' 
      ? 'bg-gray-800 border-purple-500' 
      : 'bg-white border-purple-200'
  }`}>
    <div className="flex items-center space-x-3">
      <div className="text-purple-400">{achievement.icon}</div>
      <div>
        <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
          {achievement.name}
        </h4>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          {achievement.description}
        </p>
      </div>
    </div>
  </div>
);

// Training Module Component
const TrainingModule = ({ theme, level, score, activeDemo, handleAttempt, achievements }) => (
  <div className="space-y-8">
    {/* Level Progress */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
          Level {level} Progress
        </span>
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
          Score: {score}
        </span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full">
        <div 
          className="h-full bg-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${(score / 1000) * 100}%` }}
        />
      </div>
    </div>

    {/* Current Scenario */}
    <div className={`p-6 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-900 border-purple-500' 
        : 'bg-white border-purple-200'
    }`}>
      <div className="space-y-4">
        {activeDemo === 'email' && (
          <div className="border border-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-4">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
                From: security@faceboock.com
              </span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                10:45 AM
              </span>
            </div>
            <h4 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Account Security Alert
            </h4>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              We have detected suspicious activity on your account. Immediate action required...
            </p>
            <div className="mt-4 space-x-4">
              <button 
                onClick={() => handleAttempt(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Mark as Phishing
              </button>
              <button 
                onClick={() => handleAttempt(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Mark as Safe
              </button>
            </div>
          </div>
        )}

        {activeDemo === 'voice' && (
          <div className="text-center p-8">
            <Phone className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              Incoming call from "IT Support"
            </p>
            <PlayCircle className="w-12 h-12 text-purple-400 mx-auto cursor-pointer hover:text-purple-300 mt-4" />
            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Click to play voice simulation
            </p>
          </div>
        )}

        {activeDemo === 'web' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Globe className="w-5 h-5" />
              <span>https://faceboock.com/login</span>
            </div>
            <div className="border border-gray-700 p-4 rounded">
              <img 
                src="/api/placeholder/400/200" 
                alt="Suspicious login page" 
                className="w-full rounded mb-4"
              />
              <div className="mt-4 space-x-4">
                <button 
                  onClick={() => handleAttempt(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Mark as Suspicious
                </button>
                <button 
                  onClick={() => handleAttempt(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Mark as Safe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Achievements Section */}
    <div className={`p-6 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-gray-900 border-purple-500' 
        : 'bg-white border-purple-200'
    }`}>
      <h3 className={`text-xl font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>
        Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(achievements).map(achievement => (
          <AchievementsBadge 
            key={achievement.id} 
            achievement={achievement}
            theme={theme}
          />
        ))}
      </div>
    </div>
  </div>
);

// Main App Component (continues from Part 1)
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [activeDemo, setActiveDemo] = useState('email');
  const [activeTab, setActiveTab] = useState('training');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });

  const achievements = {
    FIRST_CATCH: { 
      id: 'FIRST_CATCH',
      name: 'First Catch', 
      icon: <Shield className="w-6 h-6" />,
      description: 'Caught your first phishing attempt' 
    },
    LEVEL_MASTER: { 
      id: 'LEVEL_MASTER',
      name: 'Level Master', 
      icon: <Trophy className="w-6 h-6" />,
      description: 'Completed all levels in a category' 
    },
    PERFECT_SCORE: { 
      id: 'PERFECT_SCORE',
      name: 'Perfect Score', 
      icon: <Star className="w-6 h-6" />,
      description: 'Achieved 100% on a level' 
    }
  };

  const performanceData = [
    { day: 'Mon', score: 85 },
    { day: 'Tue', score: 92 },
    { day: 'Wed', score: 88 },
    { day: 'Thu', score: 95 },
    { day: 'Fri', score: 98 }
  ];

  const handleAttempt = (isPhishing) => {
    const correct = isPhishing === true;
    if (correct) {
      const newScore = score + (level * 100);
      setScore(newScore);
      
      setAlertContent({
        title: "Excellent Work!",
        message: "You identified the phishing attempt!"
      });
      
      if (newScore >= level * 300 && level < 5) {
        setLevel(prev => prev + 1);
      }
    } else {
      setAlertContent({
        title: "Learning Opportunity",
        message: "This was a phishing attempt. Keep practicing!"
      });
    }
    setShowFeedback(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white z-50"
      >
        {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Hero Section */}
      <div className={`relative border-b border-purple-500 ${
        theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-black' : 'bg-gradient-to-r from-purple-100 to-white'
      }`}>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                PhishAI
              </span>
            </h1>
            <p className={`text-xl mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Empower your workforce with AI-driven security awareness training
            </p>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Our platform helps employees at all levels identify and respond to sophisticated 
              phishing attempts through realistic simulations and adaptive learning.
            </p>
            <div className="space-x-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold 
                hover:bg-purple-700 transition-colors border border-purple-400 shadow-lg shadow-purple-500/20">
                Start Free Trial
              </button>
              <button className={`bg-transparent px-8 py-3 rounded-lg font-semibold 
                transition-colors border border-purple-500 ${
                theme === 'dark' ? 'text-purple-400 hover:bg-purple-900/30' : 'text-purple-600 hover:bg-purple-100'
              }`}>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Stats Section */}
       <div className={`py-16 border-b border-purple-500/30 ${
        theme === 'dark' ? 'bg-black/50' : 'bg-purple-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "95%", label: "Success Rate", description: "Training Effectiveness" },
              { value: "5+", label: "AI Models", description: "Integrated Services" },
              { value: "1000+", label: "Scenarios", description: "Training Templates" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className={`text-xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {stat.label}
                </div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Key <span className="text-purple-400">Features</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-purple-400" />,
                title: "Enterprise-Grade Training",
                description: "Customized phishing simulations based on your industry and company size."
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-400" />,
                title: "Adaptive Learning",
                description: "AI-driven scenarios that evolve based on employee performance."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                title: "Progress Tracking",
                description: "Detailed analytics on employee improvement and vulnerability areas."
              },
              {
                icon: <Cloud className="w-8 h-8 text-purple-400" />,
                title: "Educational Resources",
                description: "Comprehensive learning materials and security best practices."
              }
            ].map((feature, index) => (
              <Card key={index} className={`${
                theme === 'dark' 
                  ? 'bg-gray-900 border-purple-500 hover:border-purple-400' 
                  : 'bg-white border-purple-200 hover:border-purple-300'
              } transition-colors`}>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>


      {/* Interactive Training Section */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Interactive <span className="text-purple-400">Training</span>
          </h2>

          {/* Training/Analytics Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('training')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'training'
                  ? 'bg-purple-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Training
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Training Type Selection */}
          {activeTab === 'training' && (
            <div className="flex justify-center mb-8 space-x-4">
              {['email', 'voice', 'web'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveDemo(type)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    activeDemo === type
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Main Content Area */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'training' ? (
              <TrainingModule 
                theme={theme}
                level={level}
                score={score}
                activeDemo={activeDemo}
                handleAttempt={handleAttempt}
                achievements={achievements}
              />
            ) : (
              <div className={`p-6 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-900 border-purple-500' 
                  : 'bg-white border-purple-200'
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Performance Analytics
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="day" stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
                      <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                          border: '1px solid #6B21A8'
                        }}
                        labelStyle={{ color: theme === 'dark' ? '#E5E7EB' : '#1F2937' }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#A855F7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Alert className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } border-purple-500 max-w-md`}>
            <AlertCircle className="h-4 w-4 text-purple-400" />
            <AlertDescription className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <h3 className="text-xl font-bold mb-2">{alertContent.title}</h3>
              <p>{alertContent.message}</p>
              <button 
                onClick={() => setShowFeedback(false)}
                className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Continue Training
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};



export default App;