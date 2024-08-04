import React, { useContext, useEffect } from 'react'
import Message from './Message'
import Input from './Input'
import InfoBar from './InfoBar'
import { UserContext } from '../context/UserContext'
import FormDialog from '../componant/MUI/FormDialog'
import  TransitionAlerts from '../componant/MUI/Alert'

const Chat = () => {
    const { user, setOpen } = useContext(UserContext);
    
    useEffect(()=>{
        if (!user?.displayName) setOpen(true);
    },[user.displayName, setOpen])

    return (
        <div className="chat-container">
            <FormDialog />
            <InfoBar />
            <TransitionAlerts user={user}/>
            <Message />
            <Input />
        </div>
    )
}

export default Chat