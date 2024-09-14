import React, { useContext, useEffect, useState } from 'react';
import UserPageList from '../componant/MUI/UserPageList';
import { UserContext } from '../context/UserContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const UserPage = () => {
    const { user, setChatWithWho } = useContext(UserContext); 
    const [userPageData, setUserPageData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            const chatRef = doc(db, 'userPage', user.uid);

            const unsubscribe = onSnapshot(chatRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setUserPageData(Array.isArray(data.chats) ? data.chats : []);
                } else {
                    console.log('No such document!');
                    setUserPageData([]);
                }
                setLoading(false);
            }, (error) => {
                console.error('Error fetching user page data:', error);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [user]);

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
                setUserPageData(updatedChats); // Update local state to reflect change
            } catch (error) {
                console.error('Error removing chat:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserPageList
            userPageData={userPageData.slice().reverse()}
            handleChatWithWho={handleChatWithWho}
            handleRemoveItem={handleRemoveItem} // Pass down the remove handler
        />
    );
}

export default UserPage;
