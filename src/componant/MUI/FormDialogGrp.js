import React, { useState, useContext } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, DialogTitle, Dialog, Box, Button, Checkbox, styled, Input } from '@mui/material';
import { blue } from '@mui/material/colors';
import { UserContext } from '../../context/UserContext';
import useFetchFriends from '../../hooks/useFetchFriends';
import ScrollToBottom from 'react-scroll-to-bottom';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import Swal from 'sweetalert2';

function SimpleDialog() {
    const [grpName, setGrpName] = useState('');
    const { user, openGrp, setOpenGrp } = useContext(UserContext);
    const { userPageData } = useFetchFriends();
    const [selectedUsers, setSelectedUsers] = useState([user.uid]);
    const [visibleUsersCount, setVisibleUsersCount] = useState(4);

    const handleClose = () => {
        setOpenGrp(false);
    };

    const handleGroupSelection = (id, checked) => {
        if (checked) {
            setSelectedUsers((prev) => [...new Set([...prev, id])]); // Prevent duplicate IDs
        } else {
            setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
        }
    };

    const getUniqueGroupChatId = (selectedUsers) => {
        const sortedIds = [...new Set(selectedUsers)].sort(); // Prevent duplicate IDs and sort
        return sortedIds.join('-');
    };

    const handleCreateGroup = async () => {
        handleClose();
        if (!grpName.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a group name!',
            });
            return;
        }

        if (selectedUsers.length > 1) {
            const groupChatId = getUniqueGroupChatId(selectedUsers);
            console.log('Group Chat ID:', groupChatId);

            const groupChatRef = doc(db, 'groupChats', groupChatId);

            try {
                await setDoc(groupChatRef, {
                    groupId: groupChatId,
                    name: grpName,
                    members: selectedUsers,
                    createdBY: user?.uid,
                    createdAt: Timestamp.now()
                });

                // Show success SweetAlert after group creation
                Swal.fire({
                    icon: 'success',
                    title: 'Group Created!',
                    text: 'Your group has been created successfully.',
                    position: 'top-end',  // Position it at the top right
                    toast: true,          // Make it a toast
                    showConfirmButton: false, // No confirm button
                    timer: 3000           // Auto close after 3 seconds
                });


                console.log('Group created successfully');
            } catch (error) {
                console.error('Error creating group:', error);
            }
        } else {
            console.log('Select more than one user to create a group');
        }
    };

    const loadMoreUsers = () => {
        setVisibleUsersCount((prevCount) => prevCount + 4);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={openGrp}
            classes={{ paper: useStyles.dialog }}
        >
            <DialogTitle>Add a Group</DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <Input
                    type='text'
                    placeholder='Group Name'
                    onChange={(e) => setGrpName(e.target.value)}
                    value={grpName}
                    sx={{ flexGrow: 1, marginRight: '8px' }} // Adjust for spacing
                />
                <Button variant="contained" onClick={handleCreateGroup}>Create</Button>
            </Box>
            <ScrollToBottom checkInterval={100} className="message-container-scroll">
                <List sx={{ pt: 0 }}>
                    {userPageData?.slice(0, visibleUsersCount).reverse().map((user, index) => (
                        <ListItem key={index} className={useStyles.listItem}>
                            <ListItemButton onClick={() => handleGroupSelection(user.id, !selectedUsers.includes(user.id))}>
                                <ListItemAvatar>
                                    <Avatar src={user.img} className={useStyles.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    className={useStyles.listItemText}
                                />
                                <Checkbox
                                    className={useStyles.checkbox}
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={(event) => handleGroupSelection(user.id, event.target.checked)}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ScrollToBottom>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                <Button variant="outlined" onClick={loadMoreUsers}>Load More</Button>
            </Box>
        </Dialog>
    );
}

export default SimpleDialog;

const useStyles = styled((theme) => ({
    dialog: {
        borderRadius: '10px',
        width: '400px',  // Fixed width
        maxHeight: '500px', // Set a fixed height if needed
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
}));
