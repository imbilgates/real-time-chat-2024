import React, { useContext, useEffect, useState } from 'react';
import UserPageList from '../componant/MUI/UserPageList';
import { UserContext } from '../context/UserContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const UserPage = () => {
    const { user, setChatWithWho } = useContext(UserContext); // Ensure setChatWithWho is included
    const [userPageData, setUserPageData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            const chatRef = doc(db, 'userPage', user.uid);

            // Set up onSnapshot listener for real-time updates
            const unsubscribe = onSnapshot(chatRef, (doc) => {
                if (doc.exists()) {
                    // Extract the chats array from the document data
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

            // Clean up the listener on unmount
            return () => unsubscribe();
        }
    }, [user]);

    const handleChatWithWho = (clickedUser) => {
        setChatWithWho(clickedUser);
    };

    if (loading) {
        return <div>Loading...</div>; // You might want to use a loading spinner here
    }

    return (
        <UserPageList userPageData={userPageData} handleChatWithWho={handleChatWithWho} />
    );
}

export default UserPage;
