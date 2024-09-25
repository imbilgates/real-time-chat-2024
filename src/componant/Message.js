import React, { useContext, useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/UserContext';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import UserPage from '../pages/UserPage';
import { CircularProgress } from '@mui/material';
import { convertTimestamp } from '../utils/commonFunctions';
import GroupChatPage from '../pages/GroupChatPage';

const Message = () => {


    const [openMessageIndex, setOpenMessageIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const { messages, setMessages } = useContext(ChatContext);
    const { user, chatWithWho } = useContext(UserContext);

    const getUniqueChatId = (user, chatWithWho) => {
        const sortedUids = [user.uid, chatWithWho.uid].sort();
        return sortedUids.join('');
    };

    useEffect(() => {
        console.log("hi");
        if (user && chatWithWho) {
            setLoading(true);
            const chatRef = doc(db, "chats", getUniqueChatId(user, chatWithWho));
            const unsubscribe = onSnapshot(chatRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setMessages(data.messages || []);
                } else {
                    setMessages([]);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [user, chatWithWho, setMessages]);

    const deleteChat = async (msg) => {
        try {
            const chatId = getUniqueChatId(user, chatWithWho);
            const chatRef = doc(db, "chats", chatId);

            await updateDoc(chatRef, {
                messages: arrayRemove(msg)
            });
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    const toggleDeleteIcon = (index) => {
        setOpenMessageIndex(prevIndex => prevIndex === index ? null : index);
    }

    if (loading) return (
        <div className='loading-container'>
            <CircularProgress />
        </div>
    );
    


    return (
        <div className={`${chatWithWho.length === 0 ? 'message-container' : "message-container-bg"}`} >
            {/* <ThemeDialog /> */}
            <ScrollToBottom checkInterval={100} className={`${chatWithWho.length !== 0 && "message-container-scroll"}`}>
                {messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === user.uid ? 'sent' : 'received'}`}
                        onClick={() => msg.sender === user.uid && toggleDeleteIcon(index)}
                    >
                        <div className='message-content'>
                            <p className='message-img'>
                                <img src={msg?.img} alt="" style={photoURL} />
                                <p className='message-name'>{msg.name}</p>
                                {msg.sender === user.uid && openMessageIndex === index && (
                                    <b style={{ flex: 1, cursor: 'pointer' }} onClick={() => deleteChat(msg)}>🗑️</b>
                                )}
                            </p>
                            <p className='message-text'>{msg?.text}</p>
                            <p className='message-time'>{convertTimestamp(msg?.time)}</p>
                        </div>
                    </div>
                ))}
            </ScrollToBottom>
        </div>
    );
};

export default Message;

const photoURL = { width: '20px', height: '20px', borderRadius: '50%' };

