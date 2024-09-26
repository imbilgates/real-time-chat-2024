import React, { useContext, useEffect } from 'react'
import Message from './Message'
import Input from './Input'
import InfoBar from './InfoBar'
import { UserContext } from '../context/UserContext'
import FormDialog from '../componant/MUI/FormDialog'
import FormDialogGrp from '../componant/MUI/FormDialogGrp'
import TabBar from './TabBar'
import { ChatContext } from '../context/ChatContext'
import UserPage from '../pages/UserPage'
import GroupChatPage from '../pages/GroupChatPage'

const Chat = () => {

    const { user, setOpen, chatWithWho } = useContext(UserContext);
    const { chatPhase, setChatPhase } = useContext(ChatContext);

    useEffect(() => {
        if (!user?.displayName) setOpen(true);
    }, [user.displayName, setOpen, chatWithWho])



    return (
        <div className="chat-container">
            <FormDialog />
            <FormDialogGrp />
            <InfoBar />
            {/* Only show Message component if chatWithWho is not empty */}
            {!chatWithWho.length > 0 && chatPhase === 'messages' && <Message />}
            {/* Only show UserPage if chatWithWho is empty and chatPhase is 'user' */}
            {chatWithWho.length === 0 && chatPhase === 'user' && <UserPage />}
            {/* Only show GroupChatPage if chatWithWho is empty and chatPhase is 'group' */}
            {chatWithWho.length === 0 && chatPhase === 'group' && <GroupChatPage />}
            <Input />
            {/* Only show TabBar if chatWithWho is empty */}
            {chatWithWho.length === 0 && <TabBar />}
        </div>

    )
}

export default Chat