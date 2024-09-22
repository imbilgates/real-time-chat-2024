import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { signInWithGoogle } from '../../config/firebase-config';
import { register } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClicked } from '../../store/authSlice';

const Signup = () => {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState('');

  const { loading, error } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(register({ email: registerEmail, password: registerPassword, username: username }));
  };

  const handleClick = () => {
    dispatch(setIsClicked());
  }

  return (
    <div className="sign-Up">
      <h3 className="sign-Up-heading">Register User</h3>
      <input
        className="sign-Up-input"
        placeholder="Username.."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="sign-Up-input"
        placeholder="Email.."
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        className="sign-Up-input"
        placeholder="Password.."
        type="password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button className="sign-Up-button" onClick={handleRegister}>
        {loading ? (
          <ReactLoading type={'spin'} color={"#ffffff"} height={'20px'} width={'20px'} />
        ) : (
          "Register"
        )}
      </button><br />
      {error && <p>{error}</p>}
      <button className="link-button" onClick={handleClick}>To Login</button><br /><br />
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Signup;

