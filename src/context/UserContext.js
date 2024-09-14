import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [chatWithWho, setChatWithWho] = useState([]);
  const [openNotify, setOpenNotify] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const obj = {
    user,
    setUser,
    loading,
    open,
    setOpen,
    chatWithWho,
    setChatWithWho,
    setOpenNotify,
    openNotify,
  };

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  );
};
