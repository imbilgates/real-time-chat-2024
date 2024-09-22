import React, { useContext, useRef, useState } from 'react';
import useUsersGetLog from '../hooks/useUsersGetLog';
import { Input } from '@mui/material';
import SearchBox from '../componant/MUI/SearchBox';
import { UserContext } from '../context/UserContext';

const Users = () => {
    const { users } = useUsersGetLog();
    const { user } = useContext(UserContext);


    const [search, setSearch] = useState('');
    const [filterUser, setFilterUser] = useState([]);


    const searchListRef = useRef(null);

    // Handle blur only if the click is outside the search list
    const handleBlur = (e) => {
        if (!searchListRef.current.contains(e.relatedTarget)) {
            setSearch(''); // Clear search only if clicking outside
        }
    };


    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        const filtered = users.filter(filterUser =>
            filterUser.displayName.toLowerCase().includes(searchValue.toLowerCase()) &&
            filterUser.uid !== user.uid // Exclude current user
        );
        setFilterUser(filtered);
    };

    return (
        <div className='users-list' style={{ position: 'relative' }}>
            <Input
                type='text'
                placeholder='Search users...'
                onChange={handleSearch}
                onBlur={handleBlur}
                value={search}
            />
            <div ref={searchListRef} style={{  width: '100%', maxWidth: 360, bgcolor: 'transparent', position: "absolute", marginTop: "52px", zIndex: '2' }}>
                <SearchBox search={search} filterUser={filterUser} setSearch={setSearch} />
            </div>
            {/* {search && (
                filterUser.map(user => (
                    <div key={user.uid}>
                        <img src={user.photoURL} alt="" style={photoURL} />
                        <h1>{user.displayName}</h1>
                        <b>{user.lastLogin}</b>
                    </div>
                ))
            )} */}
        </div>
    );
};

export default Users;

// const photoURL = { width: '50px', height: '50px', borderRadius: '50%' };