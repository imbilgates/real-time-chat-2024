import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import useUsersGetLog from '../../hooks/useUsersGetLog';
import { Button } from '@mui/material';
import { UserContext } from '../../context/UserContext';

export default function TransitionAlerts({ user }) {
  const [open, setOpen] = useState(true);
  const [notificationData, setNotificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { users } = useUsersGetLog();
  const { setChatWithWho } = React.useContext(UserContext);

  useEffect(() => {
    if (user?.uid) {
      const chatRef = doc(db, 'notify', user.uid);

      // Set up onSnapshot listener for real-time updates
      const unsubscribe = onSnapshot(chatRef, (doc) => {
        if (doc.exists()) {
          setNotificationData(doc.data());
        } else {
          console.log('No such document!');
          setNotificationData(null); // Reset if no document found
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching notification data:', error);
        setLoading(false);
      });

      // Clean up the listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const handleConnect = async (clickedUser) => {
    setOpen(false);
    setChatWithWho(clickedUser);

    // Delete the notification document for the clicked user
    try {
      const notificationRef = doc(db, 'notify', user.uid);
      await deleteDoc(notificationRef);
    } catch (error) {
      console.error('Error deleting notification document:', error);
    }
  };

  const handleDeleteNotification = async () => {
    setOpen(false);

    // Delete the notification document for the user
    try {
      const notificationRef = doc(db, 'notify', user.uid);
      await deleteDoc(notificationRef);
    } catch (error) {
      console.error('Error deleting notification document:', error);
    }
  };

  if (loading) return null;
  if (!notificationData) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          sx={{
            mb: 2,
            backgroundColor: 'lightgreen',
            color: '#33691e',
            '& .MuiAlert-icon': {
              color: '#33691e',
            },
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }
          }}
        >
          {users.filter(user => user.uid === notificationData.id).map(user => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={user.photoURL}
                alt="User"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%'
                }}
              />
              <p style={{ margin: 0, fontWeight: 'bold' }}>{user.displayName}</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{notificationData?.text}</p>
              <Button onClick={() => handleConnect(user)}>Connect</Button>
              <Button onClick={handleDeleteNotification}>❌</Button>
            </div>
          ))}
        </Alert>
      </Collapse>
    </Box>
  );
}
