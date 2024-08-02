import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../context/UserContext';

export default function ListBox({ filterUser, search, setSearch }) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { setChatWithWho } = React.useContext(UserContext);

  const handleChatWithWho = (user) => {
    setChatWithWho(user);
    console.log(user);
    
    setSearch('');
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', position: "absolute", marginTop: "52px", zIndex: '2' }}>
      {search && filterUser.map((user) => {
        const labelId = `checkbox-list-secondary-label-${user.uid}`;
        return (
          <ListItem
            key={user.uid}
            onClick={() => handleChatWithWho(user)}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(user.uid)}
                checked={checked.indexOf(user.uid) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
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
              <ListItemText id={labelId} primary={user.displayName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
