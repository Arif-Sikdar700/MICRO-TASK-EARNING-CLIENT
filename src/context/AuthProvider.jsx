import { createContext, useEffect, useState } from "react";
import { auth } from "./../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const userSingUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userSingIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userUpdateProfile = (updateDate) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateDate);
  };
  // state manage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currenUser) => {
      if (currenUser?.email) {
        setUser(currenUser);
        setLoading(false);
        const user = { email: currenUser?.email };
        try {
          const { data } = await axiosPublic.post("/jwt", user);

          if (data.token) {
            localStorage.setItem("access-token", data.token);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // google login
  const google = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, google);
  };

  const authInfo = {
    userSingUp,
    userSingIn,
    userLogout,
    loading,
    userUpdateProfile,
    user,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
