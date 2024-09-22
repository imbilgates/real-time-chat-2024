import React, { useContext, useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/UserContext';
import UserPage from '../pages/UserPage';
import { convertTimestamp } from '../utils/commonFunctions';

const Message = () => {
    const [openMessageIndex, setOpenMessageIndex] = useState(null);
    const { messages, setMessages } = useContext(ChatContext);
    const { user, chatWithWho } = useContext(UserContext);

    useEffect(() => {
        if (!user && !chatWithWho) return setMessages([]);
    }, [user, chatWithWho, setMessages]);

    const deleteChat = (msgId) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== msgId));
    };

    const toggleDeleteIcon = (index) => {
        setOpenMessageIndex(prevIndex => prevIndex === index ? null : index);
    };

    // Render the UserPage if no user is selected to chat with
    if (chatWithWho.length === 0) {
        return <UserPage />;
    }

    // Render the message container and messages only when there's a chat
    return (
        <div className="message-container-bg">
            <ScrollToBottom checkInterval={100} className="message-container-scroll">
                {messages?.map((msg, index) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.sender === user.uid ? 'sent' : 'received'}`}
                        onClick={() => msg.sender === user.uid && toggleDeleteIcon(index)}
                    >
                        <div className='message-content'>
                            <p className='message-img'>
                                <img src={msg?.img} alt="" style={photoURL} />
                                <p className='message-name'>{msg.name}</p>
                                {msg.sender === user.uid && openMessageIndex === index && (
                                    <b
                                        style={{ flex: 1, cursor: 'pointer' }}
                                        onClick={() => deleteChat(msg.id)}
                                    >🗑️</b>
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
