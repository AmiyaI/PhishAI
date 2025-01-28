import React from 'react';
import { X } from 'lucide-react';

const VideoModal = ({ theme, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className={`relative w-full max-w-4xl rounded-lg overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } border border-purple-500`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 
            text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="aspect-video">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src="/phishing_dangers.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;