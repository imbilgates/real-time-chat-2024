import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import GroupPageList from '../componant/MUI/GroupPageList';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../context/UserContext';
import { db } from '../config/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

const GroupChatPage = () => {

  const { chatPhase } = useContext(ChatContext);


  if (!chatPhase === 'group') return;


  const { user, setChatWithWho, setOpenGrp } = useContext(UserContext);


  const handleChatWithWho = (clickedUser) => {
    setChatWithWho(clickedUser);
    console.log(clickedUser);
    
  };

  const handleRemoveItem = async (id) => {
    if (user?.uid) {
      const chatRef = doc(db, 'groupChats', id);
  
      try {
        await deleteDoc(chatRef); // Delete the entire group chat document
      } catch (error) {
        console.error('Error removing chat:', error);
      }
    }
  };



  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <h3>GROUP PAGE</h3>
        <div onClick={() => setOpenGrp(true)}>
          <AddIcon />
        </div>
      </div>

      <ScrollToBottom className="chat-container" >
        <GroupPageList
          handleChatWithWho={handleChatWithWho}
          handleRemoveItem={handleRemoveItem}
        />
      </ScrollToBottom>
    </>
  )
}

export default GroupChatPage