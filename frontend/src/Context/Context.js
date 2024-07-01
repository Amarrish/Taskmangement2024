import React, { createContext, useState, useEffect } from 'react';

export const usertaskContext = createContext();

const Contextshare = ({ children }) => {
  const [usertask, setUsertask] = useState(() => {
    const savedTask = localStorage.getItem("usertask");
    return savedTask ? JSON.parse(savedTask) : {};
  });

  useEffect(() => {
    localStorage.setItem("usertask", JSON.stringify(usertask));
  }, [usertask]);
  return (
    <usertaskContext.Provider value={{ usertask, setUsertask }}>
      {children}
    </usertaskContext.Provider>
  );
};

export default Contextshare;
