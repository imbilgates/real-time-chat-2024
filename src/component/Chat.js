import React, { useContext, useEffect } from 'react'
import Message from './Message'
import Input from './Input'
import InfoBar from './InfoBar'
import { UserContext } from '../context/UserContext'
import FormDialog from '../component/MUI/FormDialog'
import FormDialogGrp from '../component/MUI/FormDialogGrp'
import TabBar from './TabBar'
import { ChatContext } from '../context/ChatContext'
import UserPage from '../pages/UserPage'
import GroupChatPage from '../pages/GroupChatPage'
import Users from '../pages/Users'
import ShowActiveUsers from './MUI/ShowActiveUsers'

const Chat = () => {

    const { user, setOpen, chatWithWho } = useContext(UserContext);
    const { chatPhase, setChatPhase } = useContext(ChatContext);

    useEffect(() => {
        if (!user?.displayName) setOpen(true);
    }, [user.displayName, setOpen, chatWithWho])



    return (
        <div className="" >
            <FormDialog />
            <FormDialogGrp />


            <div className="chat-app-container">
                {/* Left Side - Search Box and Search Items */}


                {/* Right Side - Users Page and Group Chat Users Page */}
                <div className="right-side">
                    <div className="users-page">
                        <UserPage />
                        {/* Add more users */}
                    </div>
                    <div className="group-chat-users-page">
                        <GroupChatPage />
                        {/* Add more group chat users */}
                    </div>
                </div>


                {/* Center Area */}
                <div className="center-area">
                    {/* Top Info Bar */}
                    <div className="info-bar">
                        <InfoBar />
                    </div>

                    {/* Message Display Area */}
                    <div className="message-display">
                        { chatPhase === 'user' && <ShowActiveUsers />}
                        {!chatWithWho.length > 0 && chatPhase === 'messages' && <Message />}
                        {/* Add more messages */}
                    </div>

                    {/* Bottom Input Box */}
                    <div className="input-box">
                        <Input />
                    </div>
                </div>

            </div>



        </div>

    )
}

export default Chat