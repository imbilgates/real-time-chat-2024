import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getAuth, updateProfile } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';

export default function FormDialog() {
    const { open, setOpen, setUser } = useContext(UserContext);

    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPhotoURL, setNewPhotoURL] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        if (currentUser) {
            const newDisplayName = ''; // Replace with the new display name
            const newPhotoURL = ''; // Replace with the new photo URL
    
            try {
                await updateProfile(currentUser, {
                    displayName: newDisplayName || currentUser.displayName,
                    photoURL: newPhotoURL || currentUser.photoURL
                });
    
                setMessage('Profile updated successfully');
                setUser({ ...currentUser, displayName: newDisplayName || currentUser.displayName, photoURL: newPhotoURL || currentUser.photoURL });
                setOpen(false); // Close dialog after successful update
    
                const userRef = doc(db, "users-log", currentUser.uid);
                await setDoc(userRef, {
                    displayName: newDisplayName || currentUser.displayName,
                    email: currentUser.email,
                    photoURL: newPhotoURL || currentUser.photoURL,
                    uid: currentUser.uid,
                    lastLogin: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                setMessage('Error updating profile: ' + error.message);
            }
        } else {
            setMessage('No user is signed in');
        }
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Please set your profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message && <p>{message}</p>}</DialogContentText>
                    <TextField
                        value={newPhotoURL}
                        onChange={(e) => setNewPhotoURL(e.target.value)}
                        placeholder="Enter new photo URL"
                        margin="dense"
                        id="photoURL"
                        name="photoURL"
                        label="Photo URL"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        placeholder="Enter new display name"
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleUpdate}>Done</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
