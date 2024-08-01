import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/UserContext';
import { db } from "../config/firebase-config";

const Input = () => {
    const [message, setMessage] = useState("");
    const { user, chatWithWho } = useContext(UserContext);

    const getUniqueChatId = (user, chatWithWho) => {
        const sortedUids = [user.uid, chatWithWho.uid].sort();
        return sortedUids.join('');
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const receivedMessage = {
                    name: user?.displayName || 'Anonymous',
                    img: user?.photoURL,
                    time: new Date().toLocaleTimeString(),
                    text: message,
                    sender: user?.uid
                };

                const chatId = getUniqueChatId(user, chatWithWho);
                const chatRef = doc(db, "chats", chatId);
                const chatDoc = await getDoc(chatRef);

                if (chatDoc.exists()) {
                    await updateDoc(chatRef, { 
                        messages: [...chatDoc.data().messages, receivedMessage]
                    });
                } else {
                    await setDoc(chatRef, { 
                        messages: [receivedMessage]
                    });
                }
                setMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    return (
        <div>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder={"Type here..."}
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className={"sendButton"} onClick={e => sendMessage(e)}>Send</button>
            </form>
        </div>
    );
};

export default Input;
