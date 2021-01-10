import Sidebar from 'layouts/Sidebar';
import { auth } from 'lib/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const HomePage = () => {
  const [user] = useAuthState(auth);

  return (
    <Sidebar>
      <div className="text-5xl font-bold">
        Home Page!
      </div>
    </Sidebar>
  );
};

export default HomePage;
