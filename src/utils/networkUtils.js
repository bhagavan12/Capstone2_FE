import React from 'react';

/**
 * Measure network speed, including latency and bandwidth.
 * @returns {Promise<Object>} - Network metrics including latency, bandwidth, and stability.
 */
export const measureNetworkSpeed = async () => {
  const startTime = performance.now();
  try {
    const response = await fetch('https://api.github.com/zen');
    console.log(response);
    const endTime = performance.now();
    const latency = endTime - startTime;

    // Estimate bandwidth using the Network Information API (if available)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const bandwidth = connection ? connection.downlink : calculateEstimatedBandwidth(latency);

    return {
      latency,
      bandwidth,
      isStable: latency < 200, // Consider connection stable if latency is under 200ms
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Network measurement error:', error);
    return {
      latency: 0,
      bandwidth: 0,
      isStable: false,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Calculate an estimated bandwidth based on latency.
 * @param {number} latency - Latency in milliseconds.
 * @returns {number} - Estimated bandwidth in Mbps.
 */
const calculateEstimatedBandwidth = (latency) => {
  if (latency < 50) return 100; // High speed: ~100 Mbps
  if (latency < 100) return 50; // Medium speed: ~50 Mbps
  if (latency < 200) return 25; // Low speed: ~25 Mbps
  return 10; // Very low speed: ~10 Mbps
};

/**
 * Calculate the estimated data transfer time.
 * @param {number} sizeInBytes - Size of the data in bytes.
 * @param {number} bandwidth - Bandwidth in Mbps.
 * @param {number} latency - Latency in milliseconds.
 * @returns {number} - Total transfer time in milliseconds.
 */
export const calculateTransferTime = (sizeInBytes, bandwidth, latency) => {
  // Convert bandwidth from Mbps to bytes per second
  const bytesPerSecond = (bandwidth * 1024 * 1024) / 8;
  // Calculate transfer time in milliseconds
  const transferTime = (sizeInBytes / bytesPerSecond) * 1000;
  // Add latency to get the total transfer time
  return transferTime + latency;
};
