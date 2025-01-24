import React from 'react';
import { X } from 'lucide-react';

const LogoutConfirmation = ({ theme, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className={`relative ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } border-purple-500 max-w-md p-6 rounded-lg`}>
        <button
          onClick={onCancel}
          className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/10 transition-colors ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Confirm Logout
        </h3>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Are you sure you want to log out? Your progress will be saved.
        </p>
        <div className="space-y-4">
          <button 
            onClick={onConfirm}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold 
              hover:bg-purple-700 transition-colors"
          >
            Yes, Log Out
          </button>
          <button 
            onClick={onCancel}
            className="w-full bg-transparent border border-purple-500 text-purple-500 px-6 py-3 
              rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;