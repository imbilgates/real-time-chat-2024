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
    const { chatPhase } = useContext(ChatContext);

    useEffect(() => {
        if (!user?.displayName) setOpen(true);
    }, [user.displayName, setOpen])




    return (
        <div className="chat-container">
            <FormDialog />
            <FormDialogGrp />
            <InfoBar />
            {!chatWithWho.length === 0 && <Message />}
            {chatPhase === 'user' && <UserPage />}
            {chatPhase === 'group' && <GroupChatPage />}
            <Input />
            {chatWithWho.length === 0 && <TabBar />}
        </div>
    )
}

export default Chat