import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get all users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        
        // Filter premium users
        const premium = usersData.filter(user => user.isPremium);
        setPremiumUsers(premium);
        
        // Get recent searches across all users
        const searches = [];
        usersData.forEach(user => {
          if (user.searchHistory && user.searchHistory.length > 0) {
            user.searchHistory.forEach(search => {
              searches.push({
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                ...search
              });
            });
          }
        });
        
        // Sort searches by timestamp
        searches.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate());
        setRecentSearches(searches.slice(0, 20)); // Get 20 most recent searches
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return timestamp.toDate().toLocaleDateString() + ' ' + timestamp.toDate().toLocaleTimeString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading admin data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
        
        <div className="mb-6">
          <div className="stats shadow flex">
            <div className="stat bg-white rounded-lg p-4 shadow-md">
              <div className="stat-title text-gray-500">Total Users</div>
              <div className="stat-value text-2xl text-blue-600">{users.length}</div>
            </div>
            <div className="stat bg-white rounded-lg p-4 shadow-md ml-4">
              <div className="stat-title text-gray-500">Premium Users</div>
              <div className="stat-value text-2xl text-green-600">{premiumUsers.length}</div>
            </div>
            <div className="stat bg-white rounded-lg p-4 shadow-md ml-4">
              <div className="stat-title text-gray-500">Total Searches</div>
              <div className="stat-value text-2xl text-purple-600">{recentSearches.length}</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="tabs">
            <button 
              className={`tab tab-lg ${activeTab === 'all' ? 'tab-active border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'} mr-4`}
              onClick={() => setActiveTab('all')}
            >
              All Users
            </button>
            <button 
              className={`tab tab-lg ${activeTab === 'premium' ? 'tab-active border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'} mr-4`}
              onClick={() => setActiveTab('premium')}
            >
              Premium Users
            </button>
            <button 
              className={`tab tab-lg ${activeTab === 'searches' ? 'tab-active border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('searches')}
            >
              Recent Searches
            </button>
          </div>
        </div>
        
        {activeTab === 'all' && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b">All Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Searches</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isPremium ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.isPremium ? 'Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.searchHistory?.length || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'premium' && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b">Premium Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {premiumUsers.length > 0 ? (
                    premiumUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.premiumSince)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No premium users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'searches' && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b">Recent Searches</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Query</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((search, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{search.userName}</div>
                          <div className="text-sm text-gray-500">{search.userEmail}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{search.query || search.term || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(search.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${search.isPremiumSearch ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {search.isPremiumSearch ? 'Premium' : 'Free'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No searches found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
