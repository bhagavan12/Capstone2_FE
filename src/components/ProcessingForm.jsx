import React from 'react';
import PropTypes from 'prop-types';
import { Lock, Unlock, Key } from 'lucide-react';

export const ProcessingForm = ({
  isEncrypt,
  text,
  aesKey,
  onTextChange,
  onKeyChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {isEncrypt ? 'Enter Text:' : 'Encrypted Text:'}
        </label>
        <div className="relative">
          <textarea
            rows={5}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={isEncrypt ? "Type your text here..." : "Enter encrypted text here..."}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <div className="absolute top-3 right-3">
            {isEncrypt ? <Lock className="w-5 h-5 text-gray-400" /> : <Unlock className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          AES Key:
        </label>
        <div className="relative">
          <input
            type="password"
            value={aesKey}
            onChange={(e) => onKeyChange(e.target.value)}
            placeholder="Enter AES key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white pl-10"
          />
          <Key className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {isEncrypt ? 'Encrypt and Process Data' : 'Decrypt Data'}
      </button>
    </form>
  );
};

ProcessingForm.propTypes = {
  isEncrypt: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  aesKey: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onKeyChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};