import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase-config'
import ReactLoading from 'react-loading';
import { doc, setDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const logout = async () => {
    setLoading(true);
    try {

      if (user) {
        const userStatusRef = doc(db, 'status', user?.uid);
        await setDoc(userStatusRef, { online: false }, { merge: true });
      }

      await delay(2000);
      await signOut(auth);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    <button className="log-out-btn" onClick={logout} disabled={loading}>
      {loading ? (
        <ReactLoading type={'spokes'} color={"#FF0000"} height={20} width={20} />
      ) : (
        <LogoutIcon fontSize='medium'/>)}
    </button>

  );
};

export default Logout;
