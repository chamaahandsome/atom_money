'use client';

import { getUserData } from '@/lib/actions/appwrite.actions';
import { createRapydWallet } from '@/lib/actions/rapyd.actions';
import { useEffect, useState } from 'react';


const Wallet = () => {
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateWallet = async () => {
    try {
      if (user) {
        const walletData = await createRapydWallet(user);
        setWallet(walletData);
      } else {
        console.error('User data is not available');
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      {user ? (
        <div>
          <h2>Create Wallet</h2>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleCreateWallet}>Create Wallet</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {wallet && (
        <div>
          <h2>Wallet Created</h2>
          <pre>{JSON.stringify(wallet, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Wallet;
