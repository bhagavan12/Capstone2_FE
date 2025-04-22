// // Defining types using JSDoc for better IDE support and runtime documentation

// /**
//  * @typedef {Object} DataSizes
//  * @property {number} plaintext - Size of plaintext data in bytes.
//  * @property {number} encryptedBeforeCompression - Size of data encrypted before compression in bytes.
//  * @property {number} compressed - Size of compressed data in bytes.
//  * @property {number} encryptedAfterCompression - Size of data encrypted after compression in bytes.
//  */

// /**
//  * @typedef {Object} ProcessingResult
//  * @property {boolean} success - Whether the processing was successful.
//  * @property {string} message - A message describing the result.
//  * @property {string} [data] - Optional data resulting from the process.
//  */

// /**
//  * @typedef {'text' | 'file'} InputMode - Mode of input, either text or file.
//  */

// /**
//  * @typedef {'pdf' | 'docx' | 'txt'} FileType - Accepted file types.
//  */

// /**
//  * @typedef {Object} FileData
//  * @property {string} content - The content of the file.
//  * @property {string} name - The name of the file.
//  * @property {FileType} type - The type of the file (pdf, docx, or txt).
//  */


// Defining types using JSDoc for better IDE support and runtime documentation

/**
 * @typedef {Object} NetworkMetrics
 * @property {number} latency - The latency of the network in milliseconds.
 * @property {number} bandwidth - The bandwidth of the network in Mbps.
 * @property {boolean} isStable - Whether the network is stable or not.
 * @property {string} timestamp - The timestamp when the metrics were measured.
 */

/**
 * @typedef {Object} TransferTimes
 * @property {number} withoutCompression - Time taken to transfer data without compression, in milliseconds.
 * @property {number} withCompression - Time taken to transfer data with compression, in milliseconds.
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {DataSizes} dataSizes - Information about various data sizes.
 * @property {NetworkMetrics} networkMetrics - The network performance metrics.
 * @property {TransferTimes} transferTimes - The time metrics for data transfer.
 */

/**
 * @typedef {Object} DataSizes
 * @property {number} plaintext - Size of plaintext data in bytes.
 * @property {number} encryptedBeforeCompression - Size of data encrypted before compression in bytes.
 * @property {number} compressed - Size of compressed data in bytes.
 * @property {number} encryptedAfterCompression - Size of data encrypted after compression in bytes.
 */

/**
 * @typedef {Object} ProcessingResult
 * @property {boolean} success - Whether the processing was successful.
 * @property {string} message - A message describing the result.
 * @property {string} [data] - Optional data resulting from the process.
 */

/**
 * @typedef {'text' | 'file'} InputMode - Mode of input, either text or file.
 */

/**
 * @typedef {'pdf' | 'docx' | 'txt'} FileType - Accepted file types.
 */

/**
 * @typedef {Object} FileData
 * @property {string} content - The content of the file.
 * @property {string} name - The name of the file.
 * @property {FileType} type - The type of the file (pdf, docx, or txt).
 */
