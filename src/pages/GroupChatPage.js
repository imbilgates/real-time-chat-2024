import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';

const GroupChatPage = () => {

  const { chatPhase } = useContext(ChatContext);


  if (!chatPhase === 'group') return;


  return (
    <ScrollToBottom checkInterval={100} className="message-container-scroll">
    </ScrollToBottom>
  )
}

export default GroupChatPage