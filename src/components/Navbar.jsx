import React from 'react';
import { FileText, Type } from 'lucide-react';

export const Navbar = ({ activeMode, onModeChange }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4 py-4">
          <button
            onClick={() => onModeChange('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeMode === 'text'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Type className="w-5 h-5" />
            <span>Text Input</span>
          </button>
          <button
            onClick={() => onModeChange('file')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeMode === 'file'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>File Upload</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
