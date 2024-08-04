import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useUsersGetLog from '../../hooks/useUsersGetLog';

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 560,
  backgroundColor: '#F9F9F9',
  cursor: 'pointer',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function UserPageList({ userPageData, handleChatWithWho }) {
  const { users } = useUsersGetLog();

  // Function to find a user by ID from the users list
  const findUserById = (id) => {
    return users.find(user => user.uid === id);
  };

  // Handle click event and pass the correct user object
  const handleChatWithWhoClick = (clickedUserId) => {
    const user = findUserById(clickedUserId);
    if (user) {
      console.log('Clicked user:', user);
      handleChatWithWho(user);
    } else {
      console.error('User not found');
    }
  };

  return (
    <StyledList>
      {userPageData?.map((user, index) => (
        <StyledListItem key={index} alignItems="flex-start" onClick={() => handleChatWithWhoClick(user.id)}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.img} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <React.Fragment>
                {user.text}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  - {user.time}
                </Typography>
              </React.Fragment>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}
