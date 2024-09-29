import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import useUsersGetlog from '../../hooks/useUsersGetLog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UsersAvatars({ chatWithWho }) {
    const { user, setChatWithWho } = React.useContext(UserContext);
    const { setChatPhase } = React.useContext(ChatContext);

    const { users, loading, error } = useUsersGetlog(); // Fetch users data from Firestore

    // Filter users whose uids are in the chatWithWho.members array
    const filteredUsers = users.filter(user => chatWithWho?.members?.includes(user.uid));
    console.log(filteredUsers);

    const handleBack = () => {
        setChatWithWho([]);
        setChatPhase('user');
    };

    return (
        <Container>
            {/* Back button */}
            <BackButton onClick={handleBack}>
                <ArrowBackIcon style={{ fontSize: '24px' }} />
            </BackButton>

            {/* Conditional rendering based on chatWithWho.members */}
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

            {/* Display loading or error message */}
            {loading && <LoadingMessage>Loading...</LoadingMessage>}
            {error && <ErrorMessage>Error loading users</ErrorMessage>}
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
