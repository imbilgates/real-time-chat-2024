import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ChatContext } from '../context/ChatContext';

const Input = () => {
    const { user, chatWithWho } = useContext(UserContext);
    const { message, setMessage } = useContext(ChatContext);
    const { messages, setMessages } = useContext(ChatContext);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const receivedMessage = {
                id: new Date().getTime(),
                name: user?.displayName || 'Anonymous',
                img: user?.photoURL,
                time: new Date().toLocaleTimeString(),
                text: message,
                sender: user?.uid
            };
            setMessages((prev) => [...prev, receivedMessage]);
            setMessage(""); // Clear input after sending
        }
    };

    if (chatWithWho.length === 0) return null;

    return (
        <div className='input-box'>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type here..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="sendButton" onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
};

export default Input;
