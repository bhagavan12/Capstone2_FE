import React from 'react';
import { BarChart, Activity, Wifi } from 'lucide-react';

/**
 * PerformanceMetrics Component
 * @param {Object} props - Component properties
 * @param {Object} props.metrics - Performance metrics data
 */
export const PerformanceMetrics = ({ metrics }) => {
  const { networkMetrics, transferTimes, ...sizes } = metrics;

  // Calculate speed improvement percentage
  const speedImprovement = (
    ((transferTimes.withoutCompression - transferTimes.withCompression) /
      transferTimes.withoutCompression) *
    100
  ).toFixed(2);
  const maxSize = Math.max(
    sizes.plaintext,
    sizes.encryptedBeforeCompression,
    sizes.compressed,
    sizes.encryptedAfterCompression
  );

  const getPercentage = (size) => (size / maxSize) * 100;
  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 md:grid md:grid-cols-3 md:gap-6">
      {/* Left Side (Network Status, Transfer Times) */}
      <div className="md:col-span-2">
        {/* Network Status */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center mb-4">
            <Wifi className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Network Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{ label: 'Latency', value: `${networkMetrics.latency.toFixed(2)} ms` },
              { label: 'Bandwidth', value: `${networkMetrics.bandwidth.toFixed(2)} Mbps` },
              { label: 'Connection', value: networkMetrics.isStable ? 'Stable' : 'Unstable' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Times */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer Performance</h3>
          </div>
          <div className="space-y-4">
            {['withoutCompression', 'withCompression'].map((key, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>
                    {key === 'withoutCompression' ? 'Without Compression:' : 'With Compression:'}
                  </span>
                  <span>{(transferTimes[key] / 1000).toFixed(2)} seconds</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`h-2.5 rounded-full ${
                      key === 'withoutCompression' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                    style={{
                      width:
                        key === 'withoutCompression'
                          ? '100%'
                          : `${(transferTimes.withCompression / transferTimes.withoutCompression) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="text-center mt-2">
              <p className="text-green-600 dark:text-green-400 font-semibold">
                {speedImprovement}% faster with compression
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Data Sizes) */}
      <div>
        <div className="flex items-center mb-4">
          <BarChart className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Sizes</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(sizes).map(([key, size]) => (
            <div key={key}>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
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
    </div>
  );
};

// PerformanceMetrics.propTypes = {
//     sizes: PropTypes.shape({
//       plaintext: PropTypes.number.isRequired,
//       encryptedBeforeCompression: PropTypes.number.isRequired,
//       compressed: PropTypes.number.isRequired,
//       encryptedAfterCompression: PropTypes.number.isRequired,
//     }).isRequired,
//   };