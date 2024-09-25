import React, { useContext } from 'react';
import UserPageList from '../componant/MUI/UserPageList';
import { UserContext } from '../context/UserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import useFetchFriends from '../hooks/useFetchFriends';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';

const UserPage = () => {
    
    const { chatPhase } = useContext(ChatContext);

    const { user, setChatWithWho } = useContext(UserContext);

    const { userPageData, loading, error } = useFetchFriends();


    const handleChatWithWho = (clickedUser) => {
        setChatWithWho(clickedUser);
    };

    // Function to remove a chat item from Firestore and state
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!chatPhase === 'user') return;

    return (
        <ScrollToBottom checkInterval={100} className="message-container-scroll">
            <UserPageList
                handleChatWithWho={handleChatWithWho}
                handleRemoveItem={handleRemoveItem} // Pass down the remove handler
            />
        </ScrollToBottom>
    );
}

export default UserPage;
