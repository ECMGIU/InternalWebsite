import { auth } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex items-strech h-screen p-6">
      <div className="w-72 bg-white border-black border flex flex-col">
        <div className="font-extrabold text-xl placeholder text-black">ECMG Internal Website</div>
        <div className="flex-1 p-6">
          <ul className="space-y-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/trades">Trades</Link></li>
            <li><Link to="/fidelity">Fidelity Input</Link></li>
            <li><Link to="/chat">Chat</Link></li>

          </ul>
        </div>
        <div className="w-full flex justify-between">
          <div className="placeholder text-black">{user.email}</div>
          <button type="button" onClick={() => auth.signOut()} className="placeholder text-black">Logout</button>
        </div>
      </div>

      <div className="pl-6 flex-1">{children}</div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
