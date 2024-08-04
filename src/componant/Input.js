import React, { useContext } from 'react';
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { UserContext } from '../context/UserContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../config/firebase-config';

const Input = () => {
    const { user, chatWithWho } = useContext(UserContext);
    const { message, setMessage } = useContext(ChatContext);

    const getUniqueChatId = (user, chatWithWho) => {
        const sortedUids = [user.uid, chatWithWho.uid].sort();
        return sortedUids.join('');
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const receivedMessage = {
                    id: new Date().getTime(), // Unique ID for each message
                    name: user?.displayName || 'Anonymous',
                    img: user?.photoURL,
                    time: new Date().toLocaleTimeString(),
                    text: message,
                    sender: user?.uid
                };

                const chatId = getUniqueChatId(user, chatWithWho);
                const chatRef = doc(db, 'chats', chatId);
                const chatDoc = await getDoc(chatRef);

                if (chatDoc.exists()) {
                    await updateDoc(chatRef, {
                        messages: arrayUnion(receivedMessage) // Use arrayUnion to avoid duplicates
                    });
                } else {
                    await setDoc(chatRef, {
                        messages: [receivedMessage]
                    });
                }

                // Update the userPage collection with the latest message
                const userPageRef = doc(db, 'userPage', chatWithWho?.uid);
                const userPageDoc = await getDoc(userPageRef);

                const newChatData = {
                    id: user?.uid,
                    name: user?.displayName,
                    img: user?.photoURL,
                    text: message,
                    time: new Date().toLocaleTimeString()
                };

                if (userPageDoc.exists()) {
                    const currentData = userPageDoc.data().chats || [];
                    const updatedData = currentData.filter(chat => chat.id !== newChatData.id);
                    updatedData.push(newChatData);
                    await updateDoc(userPageRef, {
                        chats: updatedData
                    });
                } else {
                    await setDoc(userPageRef, { chats: [newChatData] });
                }

                setMessage('');

            } catch (error) {
                console.error('Error sending message: ', error);
            }
        }
    };

    return (
        <div>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type here..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
            </form>
        </div>
    );
};

export default Input;