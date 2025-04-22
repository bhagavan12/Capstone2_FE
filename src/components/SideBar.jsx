import React from 'react';
import '../pages/styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update activeTab state
    navigate('/hmsg'); // Navigate to /hmsg
  };
  return (
    <nav className="sidebar">
      <button
        className={`nav-button ${activeTab === 'inbox' ? 'active' : ''}`}
        onClick={() => handleTabClick('inbox')}
      >
        Inbox
      </button>
      <button
        className={`nav-button ${activeTab === 'outbox' ? 'active' : ''}`}
        onClick={() => handleTabClick('outbox')}
      >
        Outbox
      </button>
      <button className="nav-button logout-button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;