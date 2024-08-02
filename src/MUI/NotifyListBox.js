import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../context/UserContext';
import useUsersGetLog from '../hooks/useUsersGetLog';

export default function NotifyListBox() {
    const { openNotify, setOpenNotify } = React.useContext(UserContext);
    const { users } = useUsersGetLog();

    const handleListItem = () => {
        setOpenNotify(false);
    };

    return (
        <List dense sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'transparent',
            position: 'absolute',
            marginTop: '25px',
            zIndex: '2'
        }}>
            {openNotify && users.map((user) => {
                const labelId = `checkbox-list-secondary-label-${user.uid}`;
                return (
                    <ListItem
                        key={user.uid}
                        onClick={() => handleListItem(user)}
                        disablePadding
                        sx={{ display: 'flex', alignItems: 'center' }} // Ensures content is aligned horizontally within each ListItem
                    >
                        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: '-80px' }}>
                            <ListItemAvatar sx={{ marginRight: '8px' }}>
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
