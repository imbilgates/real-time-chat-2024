import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import useUsersGetLog from '../../hooks/useUsersGetLog';

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
        <List sx={{ width: '100%', maxWidth: 560, bgcolor: '#F9F9F9' }}>
            {userPageData?.map((user, index) => (
                <ListItem key={index} alignItems="flex-start" onClick={() => handleChatWithWhoClick(user.id)}>
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
                </ListItem>
            ))}
        </List>
    );
}
