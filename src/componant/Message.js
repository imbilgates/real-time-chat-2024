import React, { useContext, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/UserContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const Message = () => {
    const { messages, setMessages } = useContext(ChatContext);
    const { user, chatWithWho } = useContext(UserContext);

    const getUniqueChatId = (user, chatWithWho) => {
        const sortedUids = [user, chatWithWho].sort();
        return sortedUids.join('');
    };

    useEffect(() => {
        if (user && chatWithWho) {
            const chatRef = doc(db, "chats", getUniqueChatId(user.uid, chatWithWho.uid));
            const unsubscribe = onSnapshot(chatRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setMessages(data.messages || []);
                } else {
                    setMessages([]);
                }
            });

            return () => unsubscribe(); // Cleanup the listener on unmount
        }
    }, [user, chatWithWho]);

    return (
        <ScrollToBottom className='message-container'>
            {messages?.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === user.uid ? 'sent' : 'received'}`}>
                    <p className='message-img'>
                        <img src={msg?.img} alt="" style={photoURL} />
                        <p className='message-name'>{msg.name}</p>
                    </p>
                    <p className='message-text'>{msg?.text}</p>
                    <p className='message-time'>{msg?.time}</p>
                </div>
            ))}
        </ScrollToBottom>
    );
};

export default Message;

const photoURL = { width: '20px', height: '20px', borderRadius: '50%' };
