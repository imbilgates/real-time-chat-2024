import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../config/firebase-config'
import ReactLoading from 'react-loading';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Logout = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogout = async () => {
    setLoading(true);
    try {
      await delay(2000);
      await signOut(auth);
      dispatch(logout())
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    <button className="log-out-btn" onClick={handleLogout} disabled={loading}>
      {loading ? (
        <ReactLoading type={'spokes'} color={"#FF0000"} height={20} width={20} />
      ) : (
        <LogoutIcon fontSize='medium' />)}
    </button>

  );
};

export default Logout;
