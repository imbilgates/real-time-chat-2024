import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useUsersGetLog from '../../hooks/useUsersGetLog';
import { Badge, Stack } from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function UserPageList({ userPageData, handleChatWithWho }) {
  const { users } = useUsersGetLog();
  const [onlineStatuses, setOnlineStatuses] = React.useState({});

  React.useEffect(() => {
    const unsubscribe = userPageData.map((user) => {
      const userStatusRef = doc(db, 'status', user.id);
      return onSnapshot(userStatusRef, (statusSnap) => {
        setOnlineStatuses((prevStatuses) => ({
          ...prevStatuses,
          [user.id]: statusSnap.exists() && statusSnap.data().online,
        }));
      });
    });

    return () => {
      unsubscribe.forEach(unsub => unsub());
    };
  }, [userPageData]);

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
      {userPageData?.map((user, index) => {
        const isOnline = onlineStatuses[user.id];

        return (
          <StyledListItem key={index} alignItems="flex-start" onClick={() => handleChatWithWhoClick(user.id)}>
            <ListItemAvatar>
              <Stack direction="row" spacing={2}>
                {isOnline ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={user.name} src={user.img} />
                  </StyledBadge>
                ) : (
                  <Avatar alt={user.name} src={user.img} />
                )}
              </Stack>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <React.Fragment>
                  {user.text}
                  <Typography
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
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
        );
      })}
    </StyledList>
  );
}