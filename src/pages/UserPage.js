import React, { useContext } from 'react';
import UserPageList from '../component/MUI/UserPageList';
import { UserContext } from '../context/UserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import useFetchFriends from '../hooks/useFetchFriends';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';
import Users from './Users';

const UserPage = () => {

    const { setChatPhase } = useContext(ChatContext);


    const { user, setChatWithWho } = useContext(UserContext);

    const { userPageData } = useFetchFriends();


    const handleChatWithWho = (clickedUser) => {
        setChatWithWho(clickedUser);
        setChatPhase('messages')
    };


    const handleRemoveItem = async (id) => {
        if (user?.uid) {
            const chatRef = doc(db, 'userPage', user.uid);
            const updatedChats = userPageData.filter(chat => chat.id !== id); // Filter out the removed chat

            try {
                await updateDoc(chatRef, { chats: updatedChats });
            } catch (error) {
                console.error('Error removing chat:', error);
            }
        }
    };



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <h3>USERS PAGE</h3>
                <div>
                    <Users />
                </div>
            </div>
            <ScrollToBottom className="chat-container" >
                <UserPageList
                    handleChatWithWho={handleChatWithWho}
                    handleRemoveItem={handleRemoveItem} // Pass down the remove handler
                />
            </ScrollToBottom >
        </>
    );
}

export default UserPage;
