import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import useUsersGetLog from '../../hooks/useUsersGetLog';
import { convertTimestamp } from '../../utils/commonFunctions';

export default function UsersAvatars({ chatWithWho }) {
    const [open, setOpen] = React.useState(false);
    const { user, setChatWithWho } = React.useContext(UserContext);
    const { setChatPhase } = React.useContext(ChatContext);
    const { users, loading, error } = useUsersGetLog();

    const filteredUsers = users.filter(user => chatWithWho?.members?.includes(user.uid));

    const handleBack = (e) => {
        e.stopPropagation();
        setChatWithWho([]);
        setChatPhase('user');
    };

    const handleGrpList = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container onClick={handleGrpList}>
            <BackButton onClick={handleBack}>
                <ArrowBackIcon style={{ fontSize: '24px' }} />
            </BackButton>
            {chatWithWho?.members?.length > 0 ? (
                <AvatarGroupStyled max={4}>
                    {filteredUsers.map(filteredUser => (
                        <Avatar
                            key={filteredUser.id}
                            alt={filteredUser.displayName}
                            src={filteredUser.photoURL}
                        />
                    ))}
                </AvatarGroupStyled>
            ) : (
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<SmallAvatar alt={user?.displayName} src={user?.photoURL} />}
                >
                    <Avatar alt={user?.displayName} src={chatWithWho?.photoURL} />
                </Badge>
            )}
            &nbsp;
            <GroupName>{chatWithWho?.displayName || chatWithWho?.name}</GroupName>
            {loading && <LoadingMessage>Loading...</LoadingMessage>}
            {error && <ErrorMessage>Error loading users</ErrorMessage>}

            {chatWithWho?.members &&
                <SimpleDialog
                    chatWithWho={chatWithWho}
                    open={open}
                    handleClose={handleClose}
                    users={filteredUsers}
                />
            }
        </Container>
    );
}

// Styles
const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
}));

const BackButton = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
    color: theme.palette.primary.main,
}));

const AvatarGroupStyled = styled(AvatarGroup)(({ theme }) => ({
    '& .MuiAvatar-root': {
        width: 40,
        height: 40,
        fontSize: '1rem',
        border: `2px solid ${theme.palette.background.paper}`,
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

const GroupName = styled('span')(({ theme }) => ({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginLeft: '8px',
}));

const LoadingMessage = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginLeft: '16px',
}));

const ErrorMessage = styled('p')(({ theme }) => ({
    color: theme.palette.error.main,
    marginLeft: '16px',
}));

// SimpleDialog component
function SimpleDialog({ open, handleClose, users, chatWithWho }) {
    const { users: user } = useUsersGetLog();

    // Function to find a user by ID from the users list
    const findUserById = (id) => {
        return user.find(user => user.uid === id);
    };

    const createdBy = findUserById(chatWithWho?.createdBY);

    return (
        <Dialog
            open={open}
            onClick={handleClose}
            PaperProps={{
                style: {
                    width: '400px',
                    height: '300px',
                    borderRadius: '12px',
                    overflowY: 'hidden',
                },
            }}
        >
            <Box onClick={(e) => e.stopPropagation()}>
                <DialogTitle>
                    {chatWithWho.name} <b>Group</b>
                    <Button onClick={handleClose} style={{ float: 'right' }}>❌</Button>
                </DialogTitle>
                <CreatedAtText>
                    Created At: {convertTimestamp(chatWithWho?.createdAt)}
                </CreatedAtText>
                <ScrollContainer>
                    <List>
                        {users.map((user) => (
                            <ListItem disableGutters key={user.uid}>
                                <ListItemButton onClick={() => handleClose()}>
                                    <ListItemAvatar>
                                        <Avatar src={user.photoURL}>
                                            {!user.photoURL && <PersonIcon />}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={createdBy?.displayName === user.displayName ? <span>{user.displayName} <b style={{ color: 'red' }}>Admin</b></span> : user.displayName || user.email} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disableGutters>
                            <ListItemButton onClick={() => handleClose()}>
                                <ListItemAvatar>
                                </ListItemAvatar>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </ScrollContainer>
            </Box>
        </Dialog>
    );
}

// Styles for the Created At text
const CreatedAtText = styled('p')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    margin: '0 16px 16px 16px',
}));

// Custom scrollbar styling
const ScrollContainer = styled('div')(({ theme }) => ({
    height: '230px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));
