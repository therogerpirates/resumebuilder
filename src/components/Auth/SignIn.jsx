import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check Firebase connection when component mounts
    if (!auth) {
      console.error("Firebase auth is not initialized!");
    } else {
      console.log("Firebase auth is ready");
    }
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log("Attempting to sign in with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign-in successful:", userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign-in error:", error);
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Please register first.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else {
        setError(error.message || "Failed to sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      console.log("Attempting to sign in with Google");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user already exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new user document if it doesn't exist
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: 'google.com',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isAdmin: false,
          isPremium: false
        });
      } else {
        // Update last login time
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      console.log("Google sign-in successful:", user);
      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError("An account already exists with the same email but different sign-in credentials.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show an error
      } else {
        setError(error.message || "Failed to sign in with Google. Please try again.");
      }
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
        
        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
            <div className="text-sm">
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Need an account? Register
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${loading ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.52426 55.229 -9.21677 56.479 -10.0802 57.329 L -10.0802 60.688 L -15.8385 60.688 C -20.4285 56.428 -20.4285 49.869 -15.8385 45.479 L -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -9.102 63.239 -4.26829 60.949 -1.23828 57.329 L 4.03226 60.688 C 1.30226 64.247 -3.92371 69.479 -14.754 69.479 C -19.612 69.479 -24.0085 67.779 -27.3285 64.829 L -21.8597 60.829 C -20.0997 62.389 -17.632 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -33.3945 54.169 C -34.0425 52.039 -34.3945 49.779 -34.3945 47.439 C -34.3945 45.059 -34.0025 42.759 -33.2945 40.629 L -38.7147 36.999 C -40.1247 41.299 -40.8647 45.929 -40.8647 50.439 C -40.8647 54.919 -40.1547 59.339 -38.7947 63.479 L -33.3945 54.169 Z"/>
                  <path fill="#EA4335" d="M -14.754 31.599 C -10.194 31.599 -6.16428 33.389 -3.07428 36.699 L 3.72572 30.919 C -0.964278 25.729 -8.204 21.439 -14.754 21.439 C -24.204 21.439 -32.154 27.779 -34.754 36.359 L -28.434 39.939 C -26.934 34.969 -21.284 31.599 -14.754 31.599 Z"/>
                </g>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
