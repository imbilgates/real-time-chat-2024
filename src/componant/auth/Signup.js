import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { auth, db, signInWithGoogle } from '../../config/firebase-config';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const { registerEmail, registerPassword, setRegisterEmail, setRegisterPassword, setIsClicked } = useContext(AuthContext);

  const register = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = userCredential.user;

      // Define default photoURL if not provided
      const profilePhotoURL = pfp;

      // Update Auth profile with displayName and photoURL
      await updateProfile(user, {
        displayName: username || user.displayName || '',
        photoURL: profilePhotoURL,
      });

      // Update Firestore document
      const userRef = doc(db, "users-log", user.uid);
      await setDoc(userRef, {
        displayName: username || user.displayName || "",
        email: user.email,
        photoURL: profilePhotoURL,
        uid: user.uid,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      setLoading(false);
      console.log(user);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      if (err.message.includes("auth/email-already-in-use")) {
        alert("Email already in use");
      } else if (err.message.includes("auth/invalid-email")) {
        alert("Enter an email correctly");
      }
    }
  };


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
      <button className="sign-Up-button" onClick={register}>
        {loading ? (
          <ReactLoading type={'spin'} color={"#ffffff"} height={'20px'} width={'20px'} />
        ) : (
          "Register"
        )}
      </button><br />
      <button className="link-button" onClick={() => setIsClicked(false)}>To Login</button><br /><br />
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Signup;

const pfp = "https://firebasestorage.googleapis.com/v0/b/chatwithme-f4d3b.appspot.com/o/profile_images%2Fdefault-img.jpg?alt=media&token=1ba78e09-fe52-41d2-b403-e1c46a0677cb";
