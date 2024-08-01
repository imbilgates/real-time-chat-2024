import React, { useContext, useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { AuthContext } from '../context/AuthContext';

const Auth = () => {

  const { isClicked } = useContext(AuthContext);
  
  return (
    <div className='Auth'>
        {isClicked ? <Signup /> : <Login />}
    </div>
  )
}

export default Auth