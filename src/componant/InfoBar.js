import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Logout from '../componant/auth/Logout';
import UsersAvatars from './MUI/UsersAvatars';

const InfoBar = () => {

  const { user, setOpen, chatWithWho } = useContext(UserContext);

  const openDialog = () => {
    setOpen(true);
  }


  return (
    <div className='infoBar' style={{ position: 'relative' }}>
      <div >
        {chatWithWho.length === 0 ? (
          <div className='profile' onClick={openDialog} >
            <img src={user?.photoURL} alt="" style={photoURL} />
            <b>{user?.displayName}</b>
          </div>
        ) : (
          <UsersAvatars chatWithWho={chatWithWho} />
        )
        }
      </div>
      {chatWithWho.length !== 0 &&
        <div style={{ marginTop: '10px' }}>
          <></>
        </div>}
      <div className='logout-container'>
        <Logout />
      </div>
    </div>
  )
}

export default InfoBar;

const photoURL = { width: '50px', height: '50px', borderRadius: '50%' };
