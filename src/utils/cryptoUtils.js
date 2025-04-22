// import CryptoJS from 'crypto-js';
// import pako from 'pako';

// export const compressData = (data) => {
//   try {
//     const uint8Array = new TextEncoder().encode(data);
//     const compressed = pako.deflate(uint8Array);
//     const compressedBase64 = btoa(String.fromCharCode(...compressed));
//     return { success: true, data: compressedBase64, message: 'Data compressed successfully' };
//   } catch (error) {
//     return { success: false, message: 'Compression failed' };
//   }
// };

// export const decompressData = (data) => {
//   try {
//     const compressed = Uint8Array.from(atob(data), c => c.charCodeAt(0));
//     const decompressed = pako.inflate(compressed, { to: 'string' });
//     return { success: true, data: decompressed, message: 'Data decompressed successfully' };
//   } catch (error) {
//     return { success: false, message: 'Decompression failed' };
//   }
// };

// export const encryptData = (data, key) => {
//   try {
//     const encrypted = CryptoJS.AES.encrypt(data, key).toString();
//     return { success: true, data: encrypted, message: 'Data encrypted successfully' };
//   } catch (error) {
//     return { success: false, message: 'Encryption failed' };
//   }
// };

// export const decryptData = (data, key) => {
//   try {
//     const decryptedBytes = CryptoJS.AES.decrypt(data, key);
//     const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
//     if (!decrypted) {
//       throw new Error('Invalid key or corrupted data');
//     }
//     return { success: true, data: decrypted, message: 'Data decrypted successfully' };
//   } catch (error) {
//     return { success: false, message: 'Decryption failed. Please check your key.' };
//   }
// };

// export const getSizeInBytes = (text) => new Blob([text]).size;

// export const rotateChunk = (chunk) => {
//   const arr = Array.from(chunk).map(char => char.charCodeAt(0));
//   const rotatedArr = arr.map(byte => ((byte << 1) | (byte >>> 7)) & 0xff);
//   return String.fromCharCode(...rotatedArr);
// };

// export const reverseRotateChunk = (chunk) => {
//   const arr = Array.from(chunk).map(char => char.charCodeAt(0));
//   const reversedArr = arr.map(byte => ((byte >>> 1) | (byte << 7)) & 0xff);
//   return String.fromCharCode(...reversedArr);
// };

import CryptoJS from 'crypto-js';
import pako from 'pako';

// Compress data using pako
export const compressData = (data) => {
  try {
    const uint8Array = new TextEncoder().encode(data);
    const compressed = pako.deflate(uint8Array);
    const compressedBase64 = btoa(String.fromCharCode(...compressed));
    return {
      success: true,
      data: compressedBase64,
      message: 'Data compressed successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Compression failed',
    };
  }
};

// Decompress data using pako
export const decompressData = (data) => {
  try {
    const compressed = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    const decompressed = pako.inflate(compressed, { to: 'string' });
    return {
      success: true,
      data: decompressed,
      message: 'Data decompressed successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Decompression failed',
    };
  }
};

// Encrypt data using AES
export const encryptData = (data, key) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return {
      success: true,
      data: encrypted,
      message: 'Data encrypted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Encryption failed',
    };
  }
};

// Decrypt data using AES
export const decryptData = (data, key) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, key);
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Invalid key or corrupted data');
    }
    return {
      success: true,
      data: decrypted,
      message: 'Data decrypted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Decryption failed. Please check your key.',
    };
  }
};

// Calculate size of text in bytes
export const getSizeInBytes = (text) => new Blob([text]).size;

// Rotate bits of a chunk of text (e.g., for obfuscation)
export const rotateChunk = (chunk) => {
  const arr = Array.from(chunk).map((char) => char.charCodeAt(0));
  const rotatedArr = arr.map((byte) => ((byte << 1) | (byte >>> 7)) & 0xff);
  return String.fromCharCode(...rotatedArr);
};

// Reverse rotate bits of a chunk of text
export const reverseRotateChunk = (chunk) => {
  const arr = Array.from(chunk).map((char) => char.charCodeAt(0));
  const reversedArr = arr.map((byte) => ((byte >>> 1) | (byte << 7)) & 0xff);
  return String.fromCharCode(...reversedArr);
};
