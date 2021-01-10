import { auth } from 'lib/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex items-strech h-screen">
      <div className="w-72 m-6 bg-white border-black border flex flex-col">
        <div className="bg-black p-2 text-white font-bold text-lg">ECMG Internal Website</div>
        <div className="flex-1 p-4">
          <ul className="space-y-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
        </div>
        <div className="bg-black p-2 w-full text-white flex justify-between">
          <div>
            {user.email}
          </div>
          <button type="button" onClick={() => auth.signOut()} className="font-bold">
            Logout
          </button>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Sidebar;
