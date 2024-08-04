import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    return (
        <ChatContext.Provider value={{ setMessages, messages, message, setMessage }}>
            {children}
        </ChatContext.Provider>
    )
}