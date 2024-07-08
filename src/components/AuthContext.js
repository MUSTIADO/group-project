// AuthContext.js

import React, { createContext, useState } from 'react';

// Create context object
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Additional logic for handling login (e.g., storing tokens)
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logic for handling logout (e.g., clearing tokens)
  };

  // Context value object
  const authContextValue = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  // Provide the context value to children components
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
