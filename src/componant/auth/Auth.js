import React from 'react'
import Login from './Login';
import Signup from './Signup';
import { useSelector } from 'react-redux';

const Auth = () => {

  const { clicked } = useSelector((state) => state.auth);

  return (
    <div className='Auth'>
        {clicked ? <Signup /> : <Login />}
    </div>
  )
}

export default Auth