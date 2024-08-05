import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';

const useOnlineStatus = (user) => {
  const [isOnline, setIsOnline] = useState(true); // Initially set to true as the user is viewing the site

  useEffect(() => {
    const updateOnlineStatus = async (onlineStatus) => {
      setIsOnline(onlineStatus);

      if (user) {
        const userStatusRef = doc(db, 'status', user?.uid);
        await setDoc(userStatusRef, { online: onlineStatus }, { merge: true });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateOnlineStatus(false);
      } else {
        updateOnlineStatus(true);
      }
    };

    const handleBeforeUnload = () => {
      updateOnlineStatus(false);
    };

    // Add event listeners for visibility change and before unload events
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Update the status immediately when the component mounts
    updateOnlineStatus(true);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  return isOnline;
};

export default useOnlineStatus;
