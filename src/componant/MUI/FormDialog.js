import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getAuth, updateProfile } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import { db, storage } from '../../config/firebase-config'; // Make sure to import storage from firebase-config
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase Storage functions
import { InputAdornment, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function FormDialog() {
    const { open, setOpen, setUser } = useContext(UserContext);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPhotoURL, setNewPhotoURL] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null); // State to hold the file

    useEffect(() => {
        if (open) {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser) {
                setNewDisplayName(currentUser.displayName || '');
                setNewPhotoURL(currentUser.photoURL || '');
            }
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            try {
                let photoURL = newPhotoURL;

                if (file) {
                    const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
                    await uploadBytes(storageRef, file);
                    photoURL = await getDownloadURL(storageRef);
                    setNewPhotoURL(photoURL);
                }

                await updateProfile(currentUser, {
                    displayName: newDisplayName || currentUser.displayName,
                    photoURL: photoURL || currentUser.photoURL
                });

                setMessage('Profile updated successfully');
                setUser({ ...currentUser, displayName: newDisplayName || currentUser.displayName, photoURL: photoURL || currentUser.photoURL });
                setOpen(false); // Close dialog after successful update

                const userRef = doc(db, "users-log", currentUser.uid);
                await setDoc(userRef, {
                    displayName: newDisplayName || currentUser.displayName,
                    email: currentUser.email,
                    photoURL: photoURL || currentUser.photoURL,
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

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file); // Save the file to the state
            setNewPhotoURL(URL.createObjectURL(file)); // Show preview of the selected image
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Please set your profile</DialogTitle>
            <DialogContent>
                {newPhotoURL && (
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <img src={newPhotoURL} alt="Selected preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                )}
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="upload picture"
                                    component="label"
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handlePhotoUpload}
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                <Button onClick={handleUpdate}>Done</Button>
            </DialogActions>
        </Dialog>
    );
}
