import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { currentUser, userDetails, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
          {userDetails?.photoURL ? (
            <img 
              src={userDetails.photoURL} 
              alt={userDetails.displayName || 'User'} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <FiUser className="text-gray-500" />
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center">
          <span className="text-sm font-medium text-gray-700">
            {userDetails?.displayName || currentUser.email?.split('@')[0]}
          </span>
          <FiChevronDown className={`ml-1 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700 truncate">
              {userDetails?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser.email}
            </p>
          </div>
          
          <button
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiUser className="mr-3" />
            Profile
          </button>
          
          <button
            onClick={() => {
              navigate('/settings');
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiSettings className="mr-3" />
            Settings
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <FiLogOut className="mr-3" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
