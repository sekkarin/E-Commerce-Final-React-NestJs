import { auth } from "@/configs/firebase/firebase.config";
import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";

interface Auth {
  userCredential: UserCredential | null | any;
}
const initialState: Auth = {
  userCredential: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, { payload }) => {
      const { email, password } = payload;
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => (state.userCredential = userCredential)
      );
    },
    login: (state, { payload }) => {
      const { email, password } = payload;
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => (state.userCredential = userCredential)
      );
    },
    logout: (state) => {
      signOut(auth);
      state.userCredential = null;
      localStorage.removeItem("access_token");
    },
    signUpWithGoogle: (state) => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(
        (userCredential) => (state.userCredential = userCredential)
      );
    },
    setUserCredential: (state, { payload }) => {
      if (payload) {
        state.userCredential = payload;
      }
    },
    updateUserProfile: (state, { payload }) => {
      const { name, photoURL } = payload;
      if (state.userCredential) {
        updateProfile(state.userCredential?.user, {
          displayName: name,
          photoURL: photoURL,
        });
      }
    },
  },
});

export const { setUserCredential, logout } =
  authSlice.actions;
export default authSlice.reducer;
