import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe, Shield, AlertCircle } from 'lucide-react';
import ScenarioDisplay from '../ScenarioDisplay';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TrainingSection = ({ theme }) => {
  const [activeModule, setActiveModule] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moduleProgress, setModuleProgress] = useState({
    email: 0,
    voice: 0,
    web: 0
  });

  const modules = [
    {
      id: 'email',
      title: 'Email Training',
      icon: <Mail className="w-6 h-6" />,
      description: 'Learn to identify AI-generated phishing emails',
      levelCount: 10,
      currentProgress: moduleProgress.email
    },
    {
      id: 'voice',
      title: 'Voice Call Training',
      icon: <Phone className="w-6 h-6" />,
      description: 'Recognize AI-powered voice phishing attempts',
      levelCount: 10,
      currentProgress: moduleProgress.voice
    },
    {
      id: 'web',
      title: 'Web Safety Training',
      icon: <Globe className="w-6 h-6" />,
      description: 'Identify malicious websites and fake login pages',
      levelCount: 10,
      currentProgress: moduleProgress.web
    }
  ];

  // Function to generate new scenario
  const generateScenario = async (moduleType, level) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://gml3dcqdwk.execute-api.us-east-1.amazonaws.com/dev/scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: moduleType,
          level: level,
          previousScenarios: [], // Could track previous scenarios to ensure variety
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate scenario');
      }

      const data = await response.json();
      setCurrentScenario(data);
    } catch (err) {
      setError('Failed to generate scenario. Please try again.');
      console.error('Error generating scenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleSelect = async (moduleId) => {
    setActiveModule(moduleId);
    setCurrentLevel(moduleProgress[moduleId] + 1);
    await generateScenario(moduleId, moduleProgress[moduleId] + 1);
  };

  const handleScenarioComplete = async (success) => {
    if (success) {
      const nextLevel = Math.min(currentLevel + 1, 10);
      setModuleProgress(prev => ({
        ...prev,
        [activeModule]: Math.min(prev[activeModule] + 1, 10)
      }));
      setCurrentLevel(nextLevel);
      
      // Generate next scenario if not at max level
      if (nextLevel <= 10) {
        await generateScenario(activeModule, nextLevel);
      }
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive" className={theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Module Selection */}
      {!activeModule ? (
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`p-6 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-purple-500 hover:border-purple-400'
                  : 'bg-white border-purple-200 hover:border-purple-300'
              }`}
              onClick={() => handleModuleSelect(module.id)}
            >
              {/* Module card content remains the same */}
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  {module.icon}
                </div>
                <h3 className={`ml-3 text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {module.title}
                </h3>
              </div>
              
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {module.description}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Progress: {module.currentProgress}/{module.levelCount}
                  </span>
                  <span className={`${
                    module.currentProgress === module.levelCount
                      ? 'text-green-400'
                      : theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {Math.round((module.currentProgress / module.levelCount) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{
                      width: `${(module.currentProgress / module.levelCount) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Module Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setActiveModule(null)}
                className={`mr-4 px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Back to Modules
              </button>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {modules.find(m => m.id === activeModule)?.title} - Level {currentLevel}
              </h2>
            </div>
          </div>

          {/* Scenario Display */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-900 border-purple-500'
              : 'bg-white border-purple-200'
          }`}>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
              </div>
            ) : currentScenario ? (
              <ScenarioDisplay
                scenario={currentScenario}
                type={activeModule}
                theme={theme}
                handleAttempt={handleScenarioComplete}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSection;