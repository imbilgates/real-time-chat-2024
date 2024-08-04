import React, { useContext, useState } from 'react';
import useUsersGetLog from '../hooks/useUsersGetLog';
import { Input } from '@mui/material';
import ListBox from '../componant/MUI/ListBox';
import { UserContext } from '../context/UserContext';

const Users = () => {
    const { users } = useUsersGetLog();
    const { user } = useContext(UserContext);


    const [search, setSearch] = useState('');
    const [filterUser, setFilterUser] = useState([]);

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
                value={search}
            />
            <ListBox search={search} filterUser={filterUser} setSearch={setSearch}/>
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