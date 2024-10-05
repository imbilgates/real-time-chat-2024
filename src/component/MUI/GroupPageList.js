import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Badge, CircularProgress, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { convertTimestamp } from '../../utils/commonFunctions';
import useFetchGroupChats from '../../hooks/useFetchFriendGroup';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';

export default function GroupPageList({ handleRemoveItem }) {
  const [hoveredItemId, setHoveredItemId] = React.useState(null);
  const { groupChats, loading, error } = useFetchGroupChats();

  const { setChatWithWho } = React.useContext(UserContext);
  const { setChatPhase } = React.useContext(ChatContext);


  // Handle click event to open group chat
  const handleChatWithWhoClick = (clickedGroup) => {

    if (clickedGroup) {
      console.log('Clicked group:', clickedGroup);
      setChatWithWho(clickedGroup);
      setChatPhase('messages')
    } else {
      console.error('User not found');
    }
  };

  // Handle mouse hover effects
  const handleMouseEnter = (groupId) => {
    setHoveredItemId(groupId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  if (loading) return (
    <div className='loading-container'>
      <CircularProgress />
    </div>
  );

  // If no groups are available
  if (groupChats.length === 0) {
    return <p style={styles.greeting}>No groups available. Create a group to start chatting...</p>;
  }

  return (
    <StyledList>
      {groupChats.map((group) => {
        const lastMessage = group.messages?.[group.messages.length - 1]; // Get the last message
        return (
          <StyledListItem
            key={group.id}
            alignItems="flex-start"
            onClick={() => handleChatWithWhoClick(group)}
            onMouseEnter={() => handleMouseEnter(group.id)}
            onMouseLeave={handleMouseLeave}
          >
            <ListItemAvatar>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt={group.name} src={group.img || ''} /> {/* Group avatar */}
                </StyledBadge>
              </Stack>
            </ListItemAvatar>

            <ListItemText
              primary={group.name || 'Unnamed Group'} // Display group name
              secondary={
                <>
                  <Typography
                    style={{ display: 'flex', fontSize: '10px' }}
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {lastMessage ? convertTimestamp(lastMessage.timestamp) : 'No messages yet'}
                  </Typography>
                  {lastMessage ? lastMessage.text : 'Start the conversation...'}
                </>
              }
            />
            {hoveredItemId === group.id && (
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering the chat action
                  handleRemoveItem(group.id); // Trigger remove handler
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  cursor: 'pointer',
                }}
              >
                <ClearIcon fontSize="large" />
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
  },
};

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
