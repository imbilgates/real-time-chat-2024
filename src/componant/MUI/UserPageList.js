import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Badge, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { convertTimestamp } from '../../utils/commonFunctions';
import useUsersGetLog from '../../hooks/useUsersGetLog';


export default function UserPageList({ userPageData, handleChatWithWho, handleRemoveItem }) {
  const [hoveredItemId, setHoveredItemId] = React.useState(null);
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


  const handleMouseEnter = (userId) => {
    setHoveredItemId(userId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  if ( userPageData.length === 0 ) { return <p style={styles.greeting}>Add a Friend to chat with them...</p>; };

  return (
    <StyledList>
      {userPageData?.map((user, index) => {
        return (
          <StyledListItem
            key={index}
            alignItems="flex-start"
            onClick={() => handleChatWithWhoClick(user.id)}
            onMouseEnter={() => handleMouseEnter(user.id)}
            onMouseLeave={handleMouseLeave}
          >
            <ListItemAvatar>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt={user.name} src={user.img} />
                </StyledBadge>
              </Stack>
            </ListItemAvatar>

            <ListItemText
              primary={user.name}
              secondary={
                <>
                  <Typography
                    style={{ display: 'flex', fontSize: '10px'}}
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {convertTimestamp(user.time)} {/* Convert the Firestore timestamp */}
                  </Typography>
                  {user.text}
                </>
              }
            />
            {hoveredItemId === user.id && (
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering the chat action
                  handleRemoveItem(user.id); // Trigger remove handler
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  cursor: 'pointer',
                }}
              >
                <ClearIcon fontSize='large'/>
              </div>
            )}
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}


const styles = {
  greeting: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
    marginTop: '150px',
  }
}

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
  },
}));
