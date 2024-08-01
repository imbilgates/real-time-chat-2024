import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Logout from '../auth/Logout';
import Users from '../pages/Users';

const InfoBar = () => {
  const { user, setOpen } = useContext(UserContext);

  const openDialog = () => {
    setOpen(true);
  }

  return (
    <div className='infoBar' style={{ position: 'relative' }}>
      <div className='profile' onClick={openDialog}>
        <img src={user?.photoURL} alt="" style={photoURL} />
        <b>{user?.displayName}</b>
      </div>
      <div>
        <Users />
      </div>
      <div className='logout-container'>
        <Logout />
      </div>
    </div>
  )
}

export default InfoBar;

const photoURL = { width: '50px', height: '50px', borderRadius: '50%' };
