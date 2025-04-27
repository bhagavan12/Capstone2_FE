import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Home.css'; // Import custom CSS
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
    compressData,
    decompressData,
    encryptData,
    decryptData,
    getSizeInBytes,
    rotateChunk,
    reverseRotateChunk,
  } from '../utils/cryptoUtils';
  import { createMerkleRoot } from '../utils/merkleUtils';
const Hmsg = ({ activeTab }) => {
  const navigate=useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decryptedText, setDecryptedText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedSender, setSelectedSender] = useState(''); // Sender's name for modal
  // Fetch messages on initial load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')); // Parse the JSON string
        const userId = user?.id;
        console.log(`${activeTab}`,userId);
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
        const endpoint =
          activeTab === 'outbox'
            ? `https://capstone2-be.onrender.com/api/messages/sent/${userId}`
            : `https://capstone2-be.onrender.com/api/messages/${userId}`;
        const response = await axios.get(
            endpoint,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);

        setMessages(response.data); // Assuming response.data is the array of messages
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [activeTab]); // Dependency on userId to refetch if it changes

  // Handle the "Open" button click (placeholder for now)
  const handleOpen = (message) => {
    console.log(`Opening message with ID: ${message}`);
    // Add your handleFunction here later
  };
  const handleSubmitDecryption = (message) => {
    // e.preventDefault();

    if (!message.rotatedEncryptedText || !message.aesKey) {
      toast.error('Please enter both encrypted text and AES key');
      return;
    }

    try {
      // Reverse rotation
      const unrotated = Array.from(message.rotatedEncryptedText)
        .map(reverseRotateChunk)
        .join('');

      // Decrypt the data
      const decrypted = decryptData(unrotated, message.aesKey);
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

      console.log("rotatedEncryptedText",message.rotatedEncryptedText);
      const { root, tree } = createMerkleRoot(message.rotatedEncryptedText);
      console.log("root:",root,message.merkleRoot);
      if(root==message.merkleRoot){
          console.log('Data securely received');
          toast.success('Data securely received');
        }
        setDecryptedText(decompressed.data);
        setSelectedSender(message.sendername); // Set sender's name
        setIsModalOpen(true); 
        toast.success('Data decrypted successfully!');
    } catch (error) {
      toast.error('An error occurred during decryption');
    }
  };
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setDecryptedText('');
    setSelectedSender('');
  };
  const handleNewMessage = () => {
    // Replace with your desired route
    navigate('/new-msg'); // Placeholder route; update as needed
  };
  
  return (
    <div className="home-container">
      <Toaster position="top-right" />
      <div className="content-wrapper">
        <h2>Your Messages</h2>
        {activeTab === 'outbox' && (
          <button className="new-message-button" onClick={handleNewMessage}>
            New Message
          </button>
        )}
        {messages.length === 0 ? (
          <p className="no-messages">No messages found.</p>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message._id} className="message-card">
                <h3>
                  {activeTab === "inbox"
                    ? `From: ${message.sendername} (${message.senderemail})`
                    : `To: ${message.sendername} (${message.senderemail})`}
                </h3>
                <p className="subtitle">Status: {message.messageStatus}</p>
                <div className="message-details">
                  <p><strong>Merkle Root:</strong> {message.merkleRoot}</p>
                  <p>
                    <strong>Created At:</strong>{' '}
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="open-button"
                  onClick={() => handleSubmitDecryption(message)}
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-sender">From: {selectedSender}</span>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p>{decryptedText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hmsg;