import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, FileKey, Database } from 'lucide-react';
import './styles/LandinPage.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="nav-logo">
          <Shield size={24} />
          <span>SecureShare</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')} className="nav-button">Login</button>
          <button onClick={() => navigate('/register')} className="nav-button register">Register</button>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-section">
          <h1>Secure Message Sharing with Advanced Encryption</h1>
          <p>End-to-end encryption with compression, AES, rotation, and Merkle tree verification</p>
          <button onClick={() => navigate('/register')} className="cta-button">
            Get Started
          </button>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Lock className="feature-icon" />
              <h3>AES Encryption</h3>
              <p>Military-grade encryption for your messages using Advanced Encryption Standard</p>
            </div>
            <div className="feature-card">
              <FileKey className="feature-icon" />
              <h3>Merkle Tree Verification</h3>
              <p>Cryptographic verification ensuring message integrity and authenticity</p>
            </div>
            <div className="feature-card">
              <Database className="feature-icon" />
              <h3>Distributed Storage</h3>
              <p>Secure storage using FileBase distributed file system and MongoDB</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;