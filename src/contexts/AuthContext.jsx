import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Update user data in Firestore and state
  const updateUserData = async (user, additionalData = {}) => {
    if (!user) return null;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.displayName || '',
        photoURL: user.photoURL || additionalData.photoURL || '',
        provider: user.providerData?.[0]?.providerId || 'email',
        lastLogin: serverTimestamp(),
        ...additionalData
      };

      if (!userDoc.exists()) {
        // New user
        userData.createdAt = serverTimestamp();
        userData.isAdmin = false;
        userData.isPremium = false;
        await setDoc(userRef, userData);
      } else {
        // Update existing user
        await setDoc(userRef, userData, { merge: true });
      }

      setUserDetails(userData);
      return userData;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserDetails(null);
      navigate('/login');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error('Failed to sign out');
    }
  };

  // Auth state change handler
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await updateUserData(user);
          setCurrentUser(user);
          
          // Redirect to dashboard after successful login
          if (window.location.pathname === '/login' || window.location.pathname === '/register') {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error("Error handling auth state change:", error);
        }
      } else {
        setCurrentUser(null);
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const value = {
    currentUser,
    userDetails,
    isAdmin: userDetails?.isAdmin || false,
    isPremium: userDetails?.isPremium || false,
    updateUserData,
    signOut: handleSignOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
