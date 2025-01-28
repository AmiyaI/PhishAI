import React, { useState, useRef } from 'react';
import { Phone, Globe, PlayCircle, Pause } from 'lucide-react';

const ScenarioDisplay = ({ scenario, type, theme, handleAttempt }) => {
  if (!scenario) return null;

  const renderEmailScenario = () => (
    <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
      {/* Email Client Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-600'}`}>
              EXTERNAL EMAIL
            </span>
          </div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            10:45 AM
          </span>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-4">
        <div className={`space-y-2 pb-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mr-3">
              {scenario.from[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {scenario.subject}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {scenario.from}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {scenario.content.title}
          </h2>
          <p className="mb-4 whitespace-pre-line">{scenario.content.body}</p>
          {scenario.content.link && (
            <div className={`p-3 mb-4 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <a href="#" className="text-blue-500 hover:underline break-all">
                {scenario.content.link}
              </a>
            </div>
          )}
          <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className="whitespace-pre-line">{scenario.content.footer}</p>
            {scenario.content.contact && (
              <p className="mt-4 text-sm">
                Contact: <a href="#" className="text-blue-500 hover:underline">{scenario.content.contact}</a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`p-4 mt-2 border-t ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="space-x-4">
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
    </div>
  );

  const renderVoiceScenario = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
  
    const handlePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    return (
      <div className="text-center p-8">
        <Phone className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <p className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Incoming call from "{scenario.caller}"
        </p>
        <div className={`mt-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {scenario.script}
          </p>
          
          {/* Audio Player */}
          <div className="mt-6 flex flex-col items-center">
            <audio 
              ref={audioRef}
              src={`/voiceovers/${scenario.id}.mp3`}  // Make sure this matches your file naming
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={handlePlayPause}
              className="flex items-center justify-center p-4 rounded-full bg-purple-500/10 
                hover:bg-purple-500/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-purple-400" />
              ) : (
                <PlayCircle className="w-12 h-12 text-purple-400" />
              )}
            </button>
            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {isPlaying ? 'Click to pause' : 'Click to play voice simulation'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 space-x-4">
          <button 
            onClick={() => handleAttempt(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Mark as Scam
          </button>
          <button 
            onClick={() => handleAttempt(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Mark as Legitimate
          </button>
        </div>
      </div>
    );
  };

  const renderWebScenario = () => (
    <div className="space-y-4">
      {/* URL Bar */}
      <div className={`flex items-center space-x-2 p-2 rounded ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <Globe className="w-5 h-5 text-gray-400" />
        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {scenario.url}
        </span>
      </div>

      {/* Website Content */}
      <div className={`border rounded-lg overflow-hidden ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <img 
              src={scenario.content.logo} 
              alt={`${scenario.title} Logo`}
              className="h-8 w-auto"
            />
          </div>
          
          <div className={`max-w-sm mx-auto space-y-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {scenario.content.formFields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium capitalize">
                  {field}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  className={`w-full p-2 rounded-md border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  }`}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
            
            <button className="w-full bg-blue-600 text-white rounded-md py-2 mt-4">
              {scenario.content.submitButton}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button 
          onClick={() => handleAttempt(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          Mark as Suspicious
        </button>
        <button 
          onClick={() => handleAttempt(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Mark as Safe
        </button>
      </div>
    </div>
  );

  // Main render logic
  return (
    <div className="w-full max-w-4xl mx-auto">
      {type === 'email' && renderEmailScenario()}
      {type === 'voice' && renderVoiceScenario()}
      {type === 'web' && renderWebScenario()}
    </div>
  );
};

export default ScenarioDisplay;