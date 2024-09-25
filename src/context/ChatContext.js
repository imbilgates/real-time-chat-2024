import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chatPhase, setChatPhase] = useState("user");

    return (
        <ChatContext.Provider value={{ setMessages, messages, message, setMessage, setChatPhase, chatPhase }}>
            {children}
        </ChatContext.Provider>
    )
}