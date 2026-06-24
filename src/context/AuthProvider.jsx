import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (
    email,
    password,
    displayName = "",
    photoURL = ""
  ) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName,
      photoURL,
    });

    await result.user.reload();
    setUser(auth.currentUser);

    return auth.currentUser;
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("LOGIN ERROR:", error.code);
      console.error("LOGIN MESSAGE:", error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error.code);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};