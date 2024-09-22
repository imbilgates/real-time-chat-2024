import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    loading: false,
    error: null,
    clicked: false,
  },

  reducers: {

    logout(state) {
      state.user = null;
    },
    setIsClicked(state) {
      state.clicked = !state.clicked;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setIsClicked, logout } = authSlice.actions;

export default authSlice.reducer;


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'users-log', user.uid);

      await setDoc(
        userRef,
        {
          displayName: user.displayName || '',
          email: user.email,
          photoURL: user.photoURL || '',
          uid: user.uid,
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );

      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, username);
      const user = userCredential.user;

      // Define default photoURL if not provided
      const profilePhotoURL = pfp;

      // Update Auth profile with displayName and photoURL
      await updateProfile(user, {
        displayName: username || user.displayName || '',
        photoURL: profilePhotoURL,
      });

      // Update Firestore document
      const userRef = doc(db, "users-log", user.uid);
      await setDoc(userRef, {
        displayName: username || user.displayName || "",
        email: user.email,
        photoURL: profilePhotoURL,
        uid: user.uid,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      return user;

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pfp = "https://firebasestorage.googleapis.com/v0/b/chatwithme-f4d3b.appspot.com/o/profile_images%2Fdefault-img.jpg?alt=media&token=1ba78e09-fe52-41d2-b403-e1c46a0677cb";


