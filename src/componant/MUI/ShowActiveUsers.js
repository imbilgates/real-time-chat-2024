import React from 'react';
import { Avatar, Typography } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';
import useFetchUsersByLastLogin from '../../hooks/useFetchUsersByLastLogin';


const ShowActiveUsers = () => {
    const { users, loading, error } = useFetchUsersByLastLogin();

    if (loading) return <Typography variant="h6" align="center">Loading...</Typography>;

    if (error) return <Typography variant="h6" color="error" align="center">Error: {error.message}</Typography>;

    const filteredUsers = users.slice(0, 4);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <AvatarGroupStyled max={4}>
                {filteredUsers.map(user => (
                    <Avatar
                        key={user.id}
                        alt={user.displayName || "No Name"}
                        src={user.photoURL}
                    />
                ))}
            </AvatarGroupStyled>
        </div>
    );
};

export default ShowActiveUsers;
// Styled AvatarGroup component
const AvatarGroupStyled = styled(AvatarGroup)(({ theme }) => ({
    '& .MuiAvatar-root': {
        width: 40,
        height: 40,
        fontSize: '1rem',
        border: `2px solid ${theme.palette.background.paper}`,
    },
}));
