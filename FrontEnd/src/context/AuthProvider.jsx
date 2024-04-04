import { useContext, createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxios from "../hooks/useAxiosPublic";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxios();
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    updateUserProfile,
    setReload,
    reload,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post(`/auth/jwt`, userInfo).then((response) => {
          if (response.data.token) {
            localStorage.setItem("access_token", response.data.token);
          }
        });
      } else {
        localStorage.removeItem("access_token");
      }
      return () => {
        return unsubscribe();
      };
    });
  }, [axiosPublic]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
