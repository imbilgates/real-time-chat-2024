import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { UserContext } from '../context/UserContext';
import NotifyListBox from '../MUI/NotifyListBox';

export default function BadgeNotify({ count }) {
    const { setOpenNotify } = React.useContext(UserContext);
    const handleNotify = () => {
        setOpenNotify(prev => !prev);
        console.log("close notification");
    }
    return (
        <div onClick={handleNotify}>
            <Badge badgeContent={count} color="success">
                <MailIcon color="action" />
            </Badge>
            <NotifyListBox />
        </div>
    );
}
