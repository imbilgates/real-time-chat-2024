import React, { useState, useContext } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, DialogTitle, Dialog, Box, Button, Checkbox, styled, Input } from '@mui/material';
import { blue } from '@mui/material/colors';
import { UserContext } from '../../context/UserContext';
import useFetchFriends from '../../hooks/useFetchFriends';
import ScrollToBottom from 'react-scroll-to-bottom';
import { doc, setDoc, Timestamp } from 'firebase/firestore'; // Use setDoc to set Firestore data
import { db } from '../../config/firebase-config';

function SimpleDialog() {

    const [grpName, setGrpName] = useState('');

    const { user, openGrp, setOpenGrp } = useContext(UserContext);
    const { userPageData } = useFetchFriends();
    const [selectedUsers, setSelectedUsers] = useState([user.uid]);

    const handleClose = () => {
        setOpenGrp(false);
    };

    // Handle checking and unchecking of users
    const handleGroupSelection = (id, checked) => {
        if (checked) {
            setSelectedUsers((prev) => [...prev, id]);
        } else {
            setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
        }
    };

    // Function to generate unique group chat ID
    const getUniqueGroupChatId = (selectedUsers) => {
        const sortedIds = selectedUsers.sort(); // Sort the user IDs
        return sortedIds.join('-'); // Combine the IDs to create a unique group chat ID
    };

    const handleCreateGroup = async () => {
        if (selectedUsers.length > 1) {
            const groupChatId = getUniqueGroupChatId(selectedUsers);
            console.log('Group Chat ID:', groupChatId);

            // Create group chat document reference
            const groupChatRef = doc(db, 'groupChats', groupChatId);

            try {
                // Add members to the group chat
                await setDoc(groupChatRef, {
                    name: grpName,
                    members: selectedUsers, // List of UIDs in the group
                    createdAt: Timestamp.now()
                });

                console.log('Group created successfully');
            } catch (error) {
                console.error('Error creating group:', error);
            }
        } else {
            console.log('Select more than one user to create a group');
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={openGrp}
            classes={{ paper: useStyles.dialog }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <Input
                    type='text'
                    placeholder='Group Name'
                    onChange={(e)=>setGrpName(e.target.value)}
                    value={grpName}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <DialogTitle>Add a Group</DialogTitle>
                <Button variant="contained" onClick={handleCreateGroup}>Create</Button>
            </Box>
            <ScrollToBottom checkInterval={100} className="message-container-scroll">
                <List sx={{ pt: 0 }}>
                    {userPageData?.slice(0, 4).reverse().map((user, index) => (
                        <ListItem key={index} className={useStyles.listItem}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={user.img} className={useStyles.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    className={useStyles.listItemText}
                                />
                                <Checkbox
                                    className={useStyles.checkbox}
                                    onChange={(event) => handleGroupSelection(user.id, event.target.checked)}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ScrollToBottom>
        </Dialog>
    );
}

export default SimpleDialog;

const useStyles = styled((theme) => ({
    dialog: {
        borderRadius: '10px',
        padding: '20px',
        width: '400px',
    },
    dialogTitle: {
        fontWeight: 'bold',
        fontSize: '20px',
        textAlign: 'center',
        marginBottom: '10px',
        color: blue[700],
    },
    listItem: {
        backgroundColor: blue[50],
        '&:hover': {
            backgroundColor: blue[100],
        },
        padding: '8px',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
        width: '50px',
        height: '50px',
    },
    listItemText: {
        marginLeft: '10px',
        fontWeight: 'bold',
        color: blue[800],
    },
    checkbox: {
        color: blue[700],
        '&.Mui-checked': {
            color: blue[600],
        },
    },
    button: {
        backgroundColor: blue[700],
        '&:hover': {
            backgroundColor: blue[800],
        },
        color: 'white',
        borderRadius: '20px',
        padding: '10px 20px',
        fontWeight: 'bold',
    },
}));
