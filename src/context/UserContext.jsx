import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Hardcoded profile details to meet the spec
  const [user] = useState({
    name: 'Najiullah Qureshi',
    initials: 'NQ',
    avatarColor: '#e05a47'
  });

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);