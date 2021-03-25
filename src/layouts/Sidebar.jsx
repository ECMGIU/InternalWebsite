import { auth } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex h-screen p-6 items-strech">
      <div className="flex flex-col bg-white border border-black w-72">
        <div className="text-xl font-extrabold text-black placeholder">Project Dalio</div>
        <div className="flex-1 p-6">
          <ul className="space-y-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/trades">Trades</Link></li>
            <li><Link to="/fidelity">Fidelity Input</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
        </div>
        <div className="flex justify-between w-full">
          <Link to="/user"><div className="text-black placeholder">{user.email}</div></Link>
          <button type="button" onClick={() => auth.signOut()} className="text-black placeholder">Logout</button>
        </div>
      </div>

      <div className="flex-1 pl-6">{children}</div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
