import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserContext } from '../../context/UserContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export default function ListBox({ filterUser, search, setSearch }) {
  const { user, setChatWithWho } = React.useContext(UserContext);

  const handleChatWithWho = async (clickedUser) => {
    setChatWithWho(clickedUser);
    setSearch('');
  };

  const handleAddFriend = async (event, clickedUser) => {
    event.stopPropagation();
    // Update the userPage collection with the latest message
    const userPageRef = doc(db, 'userPage', user?.uid);
    const userPageDoc = await getDoc(userPageRef);

    const newChatData = {
      id: clickedUser?.uid,
      name: clickedUser?.displayName,
      img: clickedUser?.photoURL,
      text: "no recent messages"
    };
    if (userPageDoc.exists()) {
      const currentData = userPageDoc.data().chats || [];
      const updatedData = currentData.filter(chat => chat.id !== newChatData.id);
      updatedData.push(newChatData);
      await updateDoc(userPageRef, {
        chats: updatedData
      });
    } else {
      await setDoc(userPageRef, { chats: [newChatData] });
    }
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', position: "absolute", marginTop: "52px", zIndex: '2' }}>
      {search && filterUser.map((user) => (
        <ListItem
          key={user.uid}
          onClick={() => handleChatWithWho(user)}
          secondaryAction={
            <IconButton edge="end" onClick={(event) => handleAddFriend(event, user)}>
              <PersonAddIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
              />
            </ListItemAvatar>
            <ListItemText primary={user.displayName} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
