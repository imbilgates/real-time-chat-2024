import React, { useContext } from 'react'
import Chat from '../componant/Chat';
import { UserContext } from '../context/UserContext';

const Home = () => {

  const { chatWithWho } = useContext(UserContext);

  return (
    <div className='Home'>
      <h1>Chat-With-Me</h1>
      <div className='chatWithWho'>
        {chatWithWho && <b>Chatting with: {chatWithWho.displayName}</b>}
      </div>
      <Chat />
    </div>
  )
}

export default Home;

// styles
