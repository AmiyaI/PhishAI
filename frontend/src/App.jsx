// src/App.jsx
import React, { useState } from 'react';
import { Shield, Brain, Cloud, Terminal, Server, Users, Mail, Phone, Globe, ChevronRight, PlayCircle, AlertCircle, Sun, Moon, Trophy, Book, Target, BarChart3, Award, Star, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Alert, AlertDescription } from './components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AuthForm from './components/AuthForm';
import { scenarios } from './config/scenarios';
import ScenarioDisplay from './components/ScenarioDisplay';
import ContactForm from './components/ContactForm';

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

// Upgrade to Paid Version component
const DemoProgress = ({ type, completedLevels, theme }) => (
  <div className={`mb-4 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
  }`}>
    <div className="flex justify-between items-center mb-2">
      <span>Demo Progress ({Math.min(completedLevels[type], 5)}/5)</span>
      <span className="text-sm">Free Trial</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full">
      <div 
        className="h-full bg-purple-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min((completedLevels[type] / 5) * 100, 100)}%` }}
      />
    </div>
  </div>
);

const UpgradePrompt = ({ theme, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
    <div className={`relative ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    } border-purple-500 max-w-md p-6 rounded-lg`}>
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/10 transition-colors ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className={`text-2xl font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>
        Ready to Take Your Security Training Further?
      </h3>
      <p className={`mb-6 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        You've completed the demo! Unlock the full program to:
        <ul className="mt-4 list-disc pl-5 space-y-2">
          <li>Access 100+ advanced scenarios</li>
          <li>Get detailed performance analytics</li>
          <li>Receive personalized training paths</li>
          <li>Track team progress</li>
        </ul>
      </p>
      <div className="space-y-4">
        <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold 
          hover:bg-purple-700 transition-colors">
          Upgrade to Full Version
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-transparent border border-purple-500 text-purple-500 px-6 py-3 
            rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          Continue with Demo
        </button>
      </div>
    </div>
  </div>
);

// Training Module Component
const TrainingModule = ({ theme, level, score, activeDemo, handleAttempt, achievements, currentScenario }) => (
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
        <ScenarioDisplay 
          scenario={currentScenario}
          type={activeDemo}
          theme={theme}
          handleAttempt={handleAttempt}
        />
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
  const [showAuth, setShowAuth] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(scenarios.email[0]);
  const [activeDemo, setActiveDemo] = useState('email');
  const [activeTab, setActiveTab] = useState('training');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });
  const [showContactForm, setShowContactForm] = useState(false);

  const [completedLevels, setCompletedLevels] = useState({
    email: 0,
    voice: 0,
    web: 0
  });
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

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
    const correct = isPhishing === currentScenario.isPhishing;
    if (correct) {
      const newScore = score + 200; // Adjusted to reach 1000 in 5 levels
      setScore(Math.min(newScore, 1000)); // Cap the score at 1000
      
      setAlertContent({
        title: "Excellent Work!",
        message: "You correctly identified the scenario!",
        correct: true,
        redFlags: []
      });
      
      // Track completion for current type
      if (level < 6) {
        // Show success feedback first
        setShowFeedback(true);
        
        setLevel(prev => prev + 1);
        setCompletedLevels(prev => ({
          ...prev,
          [activeDemo]: Math.min(prev[activeDemo] + 1, 5)
        }));
        
        // Load next scenario
        const currentScenarios = scenarios[activeDemo];
        const nextScenarioIndex = level % currentScenarios.length;
        setCurrentScenario(currentScenarios[nextScenarioIndex]);
        
        // If this was the last level, queue the upgrade prompt after feedback
        if (level === 5) {
          const timer = setTimeout(() => {
            setShowUpgradePrompt(true);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }
    } else {
      setAlertContent({
        title: "Learning Opportunity",
        message: currentScenario.isPhishing 
          ? "This was a phishing attempt. Here are the signs you should look for:" 
          : "This was actually a legitimate message. No red flags were present.",
        correct: false,
        redFlags: currentScenario.redFlags || []
      });
      setShowFeedback(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header Buttons */}
      <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
        {/* Contact Us Button */}
        <button
          onClick={() => setShowContactForm(true)}
          className={`px-4 py-2 rounded-lg ${
            theme === 'dark'
              ? 'bg-gray-800 text-purple-400 hover:bg-gray-700'
              : 'bg-white text-purple-600 hover:bg-gray-50'
          } transition-colors border border-purple-500`}
        >
          Contact Us
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded-full ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
          } text-white`}
        >
          {theme === 'dark' ? <Sun className="w-6 h-6 text-purple-400" /> : <Moon className="w-6 h-6 text-purple-600" />}
        </button>
      </div>

      {/* Hero Section */}
      <div className={`relative border-b border-purple-500 ${
        theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-black' : 'bg-gradient-to-r from-purple-100 to-white'
      }`}>
        <div className="container mx-auto px-4 py-24">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
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
                <button 
                  onClick={() => setShowAuth(true)} 
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold 
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
            <div className="flex-shrink-0 ml-8">
              <img 
                src="/favicon1.png" // Replace with your actual logo filename
                alt="PhishAI Logo"
                className="w-72 h-auto" // Adjust size as needed
                style={{
                  filter: theme === 'dark' ? 'brightness(0.9)' : 'none'
                }}
              />
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
      
      {/* Disclaimer & Education Section */}
      <div className={`py-16 ${
          theme === 'dark' ? 'bg-black/90' : 'bg-purple-50'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Disclaimer */}
              <div className={`mb-8 p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-red-900/20 border-red-500/50' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-2 flex items-center ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Important Disclaimer
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  This website is a learning tool designed to help users identify phishing scenarios. 
                  All scenarios presented are for educational purposes only and do not represent real threats.
                </p>
              </div>

              {/* Why Phishing is Dangerous */}
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Understanding the Threat of Phishing
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-purple-500/30' 
                      : 'bg-white border-purple-200'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Real-World Impact
                    </h3>
                    <ul className={`space-y-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <li>• Over $10 billion lost to phishing scams annually</li>
                      <li>• 83% of organizations experienced phishing attacks in 2023</li>
                      <li>• Average cost of a data breach: $4.35 million</li>
                      <li>• 90% of cyber attacks begin with phishing</li>
                    </ul>
                  </div>

                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-purple-500/30' 
                      : 'bg-white border-purple-200'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Common Threats
                    </h3>
                    <ul className={`space-y-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <li>• Credential theft leading to account compromise</li>
                      <li>• Financial fraud and unauthorized transfers</li>
                      <li>• Ransomware deployment through phishing links</li>
                      <li>• Corporate espionage and data theft</li>
                    </ul>
                  </div>
                </div>

                <p className={`mt-6 text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  In today's digital landscape, phishing attacks have become increasingly sophisticated, 
                  targeting individuals and organizations alike. Through realistic simulations and 
                  hands-on training, PhishAI helps you develop the skills needed to identify and 
                  avoid these threats, protecting yourself and your organization from potential harm.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Interactive Training Section */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Interactive <span className="text-purple-400">Training Demo</span>
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
                  onClick={() => {
                    setActiveDemo(type);
                    setLevel(1); // Reset level
                    setScore(0); // Reset score
                    setCurrentScenario(scenarios[type][0]);

                    // Only reset the score progress if this demo type hasn't been completed
                    if (completedLevels[type] < 5) {
                      setCompletedLevels(prev => ({
                        ...prev,
                        [type]: 0
                      }));
                    }
                  }}
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
                currentScenario={currentScenario}
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
          <Alert className={`relative ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } border-purple-500 max-w-md`}>
            <AlertCircle className="h-4 w-4 text-purple-400" />
            <AlertDescription className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <h3 className="text-xl font-bold mb-2">{alertContent.title}</h3>
              <p>{alertContent.message}</p>
              
              {/* Show Red Flags only when answer is incorrect and there are flags */}
              {!alertContent.correct && alertContent.redFlags && alertContent.redFlags.length > 0 && (
                <div className="mt-4">
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    Red Flags to Look For:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {alertContent.redFlags.map((flag, index) => (
                      <li key={index} className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                onClick={() => {
                  setShowFeedback(false);
                  // If at max level and score, show upgrade prompt after closing feedback
                  if (level === 5 && score === 1000) {
                    setShowUpgradePrompt(true);
                  }
                }}
                className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Continue Training
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
    
    {/* Tech Stack */}
    <div className={`py-16 border-t border-b border-purple-500/30 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-purple-50'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Powered by <span className="text-purple-400">Advanced Tech</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Terminal className="w-8 h-8 text-purple-400" />,
                title: "AWS Services",
                items: ["Bedrock", "SageMaker", "Polly", "Amplify"]
              },
              {
                icon: <Server className="w-8 h-8 text-purple-400" />,
                title: "Infrastructure",
                items: ["Terraform", "GitHub Actions", "AWS"]
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-400" />,
                title: "AI Features",
                items: ["NLP Models", "Voice Synthesis", "Image Generation"]
              }
            ].map((tech, index) => (
              <div key={index} className={`text-center p-6 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-black/40 border-purple-500/50'
                  : 'bg-white border-purple-200'
              }`}>
                <div className="flex justify-center mb-4">{tech.icon}</div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>{tech.title}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className={
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    {/* Call to Action */}
    <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Level Up Your Security?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join organizations using PhishAI to train their teams and protect against 
            sophisticated phishing attacks.
          </p>
          <button 
            onClick={() => setShowAuth(true)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold 
            hover:bg-purple-700 transition-colors border border-purple-400 shadow-lg shadow-purple-500/20">
            Get Started <ChevronRight className="inline ml-2" />
          </button>
        </div>
      </div>

    {/* Auth Form */}
    {showAuth && <AuthForm theme={theme} onClose={() => setShowAuth(false)} />}


    {/* Footer */}
    <footer className={`${
      theme === 'dark'
        ? 'bg-black border-t border-purple-500/30 text-gray-400'
        : 'bg-white border-t border-purple-200 text-gray-600'
    } py-8`}>
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 PhishAI. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="https://github.com/AmiyaI/PhishAI" 
            className="text-purple-400 hover:text-purple-300 transition-colors">
            View on GitHub
          </a>
          <button 
            onClick={() => setShowContactForm(true)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </footer>

    {/* Add UpgradePrompt Modal here */}
    {showUpgradePrompt && (
      <UpgradePrompt 
        theme={theme}
        onClose={() => setShowUpgradePrompt(false)}
      />
    )}

    {/* Add ContactForm Modal here */}
    {showContactForm && (
      <ContactForm 
        theme={theme}
        onClose={() => setShowContactForm(false)}
      />
    )}
  </div>
);
}

export default App;