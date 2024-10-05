import React, { useState } from 'react';
import { signInWithGoogle } from '../../config/firebase-config';
import ReactLoading from 'react-loading';
import { login } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClicked } from '../../store/authSlice';


const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = () => {
        dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    const handleClick = () => {
        dispatch(setIsClicked());
    }

    return (
        <div className="login">
            <h3 className="login-heading">Login</h3>
            <input
                className="login-input"
                placeholder="Email.."
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
                className="login-input"
                placeholder="Password.."
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>
                {loading ? (
                    <ReactLoading type={'spin'} color={"#ffffff"} height={'20px'} width={'20px'} />
                ) : (
                    "Login"
                )}
            </button><br />
            {error && <p>{error}</p>}
            <button className="link-button" onClick={handleClick}>To Register</button><br /><br />
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
        </div>
    );
};

export default Login;
