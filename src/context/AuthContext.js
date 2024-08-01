import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const obj = {
        loginEmail,
        loginPassword,
        registerEmail,
        registerPassword,
        isClicked,
        setLoginEmail,
        setLoginPassword,
        setRegisterEmail,
        setRegisterPassword,
        setIsClicked
    }
    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    )
};