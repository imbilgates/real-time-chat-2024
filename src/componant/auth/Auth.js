import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Login from './Login';
import Signup from './Signup';


const Auth = () => {

  const { isClicked } = useContext(AuthContext);
  
  return (
    <div className='Auth'>
        {isClicked ? <Signup /> : <Login />}
    </div>
  )
}

export default Auth