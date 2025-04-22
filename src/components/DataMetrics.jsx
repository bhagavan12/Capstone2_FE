import React from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'lucide-react';

export const DataMetrics = ({ sizes }) => {
  const maxSize = Math.max(
    sizes.plaintext,
    sizes.encryptedBeforeCompression,
    sizes.compressed,
    sizes.encryptedAfterCompression
  );

  const getPercentage = (size) => (size / maxSize) * 100;

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <BarChart className="w-5 h-5 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Size Metrics</h3>
      </div>

      <div className="space-y-4">
        {Object.entries(sizes).map(([key, size]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
              <span>{size} bytes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(size)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DataMetrics.propTypes = {
  sizes: PropTypes.shape({
    plaintext: PropTypes.number.isRequired,
    encryptedBeforeCompression: PropTypes.number.isRequired,
    compressed: PropTypes.number.isRequired,
    encryptedAfterCompression: PropTypes.number.isRequired,
  }).isRequired,
};