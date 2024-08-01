import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [ messages, setMessages ] = useState([]);
    return (
        <ChatContext.Provider value={{ setMessages, messages }}>
            {children}
        </ChatContext.Provider>
    )
}