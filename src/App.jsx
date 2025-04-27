import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Moon, Sun, ShieldCheck } from 'lucide-react';
import { ProcessingForm } from './components/ProcessingForm';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { ResultDisplay } from './components/ResultDisplay';
import { FileUpload } from './components/FileUpload';
import { Navbar } from './components/Navbar';
import { readFile } from './utils/fileUtils';
import { measureNetworkSpeed, calculateTransferTime } from './utils/networkUtils';

import { createMerkleRoot } from './utils/merkleUtils';
import {
  compressData,
  decompressData,
  encryptData,
  decryptData,
  getSizeInBytes,
  rotateChunk,
  reverseRotateChunk,
} from './utils/cryptoUtils';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [inputMode, setInputMode] = useState('text'); // Removed InputMode type
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [inputText, setInputText] = useState('');
  const [aesKey, setAesKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [rotatedEncryptedText, setRotatedEncryptedText] = useState('');
  const [networkMetrics, setNetworkMetrics] = useState({
    latency: 0,
    bandwidth: 0,
    isStable: false,
    timestamp: new Date().toISOString(),
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    plaintext: 0,
    encryptedBeforeCompression: 0,
    compressed: 0,
    encryptedAfterCompression: 0,
    networkMetrics: {
      latency: 0,
      bandwidth: 0,
      isStable: false,
      timestamp: new Date().toISOString(),
    },
    transferTimes: {
      withoutCompression: 0,
      withCompression: 0,
    },
  });

  useEffect(() => {
    const updateNetworkMetrics = async () => {
      const metrics = await measureNetworkSpeed();
      setNetworkMetrics(metrics);
    };

    updateNetworkMetrics();
    const interval = setInterval(updateNetworkMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleFileSelect = async (file) => { // Removed File type
    try {
      const result = await readFile(file);
      if (result.success && result.data) {
        setInputText(result.data);
        toast.success('File loaded successfully');
      } else {
        toast.error(result.message || 'Failed to read file');
      }
    } catch (error) {
      toast.error('Error processing file');
    }
  };

  const calculatePerformanceMetrics = (sizes, networkMetrics) => { // Removed DataSizes and NetworkMetrics types
    const transferTimeWithoutCompression = calculateTransferTime(
      sizes.encryptedBeforeCompression,
      networkMetrics.bandwidth,
      networkMetrics.latency
    );

    const transferTimeWithCompression = calculateTransferTime(
      sizes.encryptedAfterCompression,
      networkMetrics.bandwidth,
      networkMetrics.latency
    );

    return {
      ...sizes,
      networkMetrics,
      transferTimes: {
        withoutCompression: transferTimeWithoutCompression,
        withCompression: transferTimeWithCompression,
      },
    };
  };
  const sendMessage = async ({sender,receiverEmail, rotatedEncryptedText, merkleRoot, aesKey}) => {
    try {
      const token = localStorage.getItem('token'); // or sessionStorage, depending on how you store it
      const bb={
        sender,
        receiverEmail,
        rotatedEncryptedText,
        merkleRoot,
        aesKey
      }
      console.log("bb",bb);
      const response = await fetch("https://capstone2-be.onrender.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // 🛡️ send the token
        },
        body: JSON.stringify(bb)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      console.log("Message sent:", data);
      return data;
    } catch (err) {
      console.error("sendMessage error:", err);
      throw err;
    }
  };
  
  
  const handleSubmitEncryption = async (e) => {
    e.preventDefault();

    if (!inputText || !aesKey) {
      toast.error('Please enter both text and AES key');
      return;
    }
    const receiverEmail = prompt("Enter receiver's Gmail:");

    if (!receiverEmail) {
      toast.error('Receiver email is required');
      return;
    }
    try {
      // Calculate plaintext size
      const plaintextSize = getSizeInBytes(inputText);

      // Encrypt before compression
      const encryptedBeforeCompression = encryptData(inputText, aesKey);
      if (!encryptedBeforeCompression.success) {
        toast.error(encryptedBeforeCompression.message);
        return;
      }

      // Compress the input text
      const compressed = compressData(inputText);
      if (!compressed.success || !compressed.data) {
        toast.error(compressed.message);
        return;
      }

      // Encrypt the compressed text
      const encryptedAfterCompression = encryptData(compressed.data, aesKey);
      if (!encryptedAfterCompression.success || !encryptedAfterCompression.data) {
        toast.error(encryptedAfterCompression.message);
        return;
      }

      // Rotate the encrypted data
      const rotated = Array.from(encryptedAfterCompression.data)
        .map(rotateChunk)
        .join('');

      setRotatedEncryptedText(rotated);

      const sizes = {
        plaintext: plaintextSize,
        encryptedBeforeCompression: getSizeInBytes(encryptedBeforeCompression.data),
        compressed: getSizeInBytes(compressed.data),
        encryptedAfterCompression: getSizeInBytes(encryptedAfterCompression.data),
      };

      const metrics = calculatePerformanceMetrics(sizes, networkMetrics);
      setPerformanceMetrics(metrics);
      const { root, tree } = createMerkleRoot(rotated);
      console.log("root:",root,tree);
      const user1=JSON.parse(localStorage.getItem("user"));

      console.log("id",user1,user1.id,JSON.stringify(localStorage.getItem("user").id));
      await sendMessage({
        sender:user1.id,
        receiverEmail,
        rotatedEncryptedText: rotated,
        merkleRoot: root,
        aesKey
      });
      toast.success('Data processed successfully!');
    } catch (error) {
      toast.error('Error processing data');
    }
  };
  
  // console.log("rotatedEncryptedText"+rotatedEncryptedText)
  const handleSubmitDecryption = (e) => {
    e.preventDefault();

    if (!encryptedText || !aesKey) {
      toast.error('Please enter both encrypted text and AES key');
      return;
    }

    try {
      // Reverse rotation
      const unrotated = Array.from(encryptedText)
        .map(reverseRotateChunk)
        .join('');

      // Decrypt the data
      const decrypted = decryptData(unrotated, aesKey);
      if (!decrypted.success || !decrypted.data) {
        toast.error(decrypted.message);
        return;
      }

      // Decompress the data
      const decompressed = decompressData(decrypted.data);
      if (!decompressed.success || !decompressed.data) {
        toast.error(decompressed.message);
        return;
      }

      setDecryptedText(decompressed.data);
      
      toast.success('Data decrypted successfully!');
    } catch (error) {
      toast.error('An error occurred during decryption');
    }
  };
  // console.log(decryptedText);
  const acceptedFileTypes = ['pdf', 'docx', 'txt'];
  // console.log("rotatedEncryptedText:",rotatedEncryptedText);
  // const { root, tree } = createMerkleRoot(rotatedEncryptedText);
  // console.log("root:",root,tree);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust 768px as per breakpoint
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add event listener

    return () => window.removeEventListener('resize', handleResize); // Clean up
  }, []);
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${darkMode ? 'dark' : ''}`} style={{ marginLeft: isMobile ? '0px' : '200px' }}>
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AESC-Rotate 
            <h1 style={{fontSize:"small"}}>Secure Data Processor</h1>
            </h1>
          </div>
         
        </div>

        <Navbar activeMode={inputMode} onModeChange={setInputMode} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setIsEncrypt(true)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  isEncrypt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Encrypt & Send Data
              </button>
              <button
                onClick={() => {
                  setIsEncrypt(false);
                  setAesKey('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  !isEncrypt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Decrypt Data
              </button>
            </div> */}

            {inputMode === 'file' && isEncrypt && (
              <FileUpload
                onFileSelect={handleFileSelect}
                acceptedTypes={acceptedFileTypes}
              />
            )}

            <ProcessingForm
              isEncrypt={isEncrypt}
              text={isEncrypt ? inputText : encryptedText}
              aesKey={aesKey}
              onTextChange={isEncrypt ? setInputText : setEncryptedText}
              onKeyChange={setAesKey}
              onSubmit={isEncrypt ? handleSubmitEncryption : handleSubmitDecryption}
            />

            
          </div>

          <div className="space-y-6">
            {isEncrypt && rotatedEncryptedText && (
              <ResultDisplay
                title="Rotated Encrypted Text"
                text={rotatedEncryptedText}
              />
            )}

            {decryptedText && !isEncrypt && (
              <ResultDisplay
                title="Decrypted Text"
                text={decryptedText}
              />
            )}
          </div>
        </div>
        {performanceMetrics.plaintext > 0 && isEncrypt && (
              <PerformanceMetrics metrics={performanceMetrics} />
            )}
      </div>
    </div>
  );
}

export default App;
