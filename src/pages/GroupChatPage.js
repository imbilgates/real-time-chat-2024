import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import GroupPageList from '../componant/MUI/GroupPageList';
import { UserContext } from '../context/UserContext';

const GroupChatPage = () => {

  const { chatPhase } = useContext(ChatContext);


  if (!chatPhase === 'group') return;


  const { user, setChatWithWho } = useContext(UserContext);


  const handleChatWithWho = (clickedUser) => {
    setChatWithWho(clickedUser);
  };


  return (
    <ScrollToBottom className="chat-container" >
      <GroupPageList handleChatWithWho={handleChatWithWho} />
    </ScrollToBottom>
  )
}

export default GroupChatPage