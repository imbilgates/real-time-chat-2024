import React from 'react';
import Chat from '../component/Chat';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh', 
      }}
    >
      <Chat />
    </div>
  );
};

export default Home;
