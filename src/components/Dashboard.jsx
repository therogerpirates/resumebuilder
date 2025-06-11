import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/sign-in');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to ResumeAI Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h2 className="text-lg font-medium text-blue-900 mb-2">
              Authentication Successful!
            </h2>
            <p className="text-blue-700">
              {user ? `Welcome, ${user.email}!` : 'You are signed in.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Create Resume</h3>
              <p className="text-gray-600 text-sm">Build your professional resume with AI assistance</p>
              <button
                onClick={() => navigate('/profile')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Go to Profile
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">My Resumes</h3>
              <p className="text-gray-600 text-sm">View and manage your created resumes</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Premium Features</h3>
              <p className="text-gray-600 text-sm">Unlock advanced AI features and templates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
