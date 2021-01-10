import { AuthContext } from 'lib/auth';
import { auth } from 'lib/firebase';
import React, { useContext } from 'react';

const HomePage = () => {
  const user = useContext(AuthContext);

  return (
    <div className="p-8 space-y-4">
      <div className="text-5xl font-bold">
        Home Page!
      </div>
      <div className="flex space-x-4">
        <div className="px-2 py-1 bg-blue-100 inline-block text-blue-900">
          {user.currentUser.email}
        </div>
        <button type="button" onClick={() => auth.signOut()} className="button">Sign out</button>
      </div>
    </div>
  );
};

export default HomePage;
