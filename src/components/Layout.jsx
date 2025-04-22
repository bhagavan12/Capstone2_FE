import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import Sidebar from './SideBar'; // Adjust path as needed
import '../pages/styles/Layout.css'; // Adjust path as needed

const Layout = ({ children }) => {
  const { user, logout } = useAuth(); // Access user and logout from context
  const [activeTab, setActiveTab] = useState('inbox');

  // If user is not authenticated, this won't render (handled by PrivateRoute)
  if (!user) return null;

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout} // Pass logout function to Sidebar
      />
      <div className="content-container">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { activeTab })
        )}
      </div>
    </div>
  );
};

export default Layout;