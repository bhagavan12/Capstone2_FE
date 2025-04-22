import React from 'react';
import PropTypes from 'prop-types';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResultDisplay = ({ title, text }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <textarea
        readOnly
        rows={5}
        value={text}
        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
      />
    </div>
  );
};

ResultDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};