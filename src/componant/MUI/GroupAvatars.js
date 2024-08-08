import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../context/UserContext';


export default function GroupAvatars({ chatWithWho }) {
    const { user, setChatWithWho } = React.useContext(UserContext);
    return (
        <div onClick={() => setChatWithWho([])} style={{cursor: "pointer"}}>
            <b>🔙</b>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar alt={chatWithWho?.displayName} src={chatWithWho?.photoURL} />
                }
                >
                <Avatar alt={user?.displayName} src={user?.photoURL} />
            </Badge>&nbsp;
            <bn>{user?.displayName + "&" + chatWithWho?.displayName}</bn>
        </div>
    );
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));