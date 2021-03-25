import ReportList from 'components/reports/ReportList';
import Sidebar from 'layouts/Sidebar';
import { auth, firestore } from 'lib/firebase';
import React from 'react';

const UserPage = () => {
  const user = auth.currentUser;
  const username = user.email.split('@')[0];

  return (
    <Sidebar>
      <h1 className="title">Current User</h1>
      <div className="inline-block p-4 border border-black">
        <table>
          <tr>
            <td className="pr-4 font-bold">Name</td>
            <td>{user.displayName}</td>
          </tr>
          <tr>
            <td className="pr-4 font-bold">Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td className="pr-4 font-bold">Auth Provider</td>
            <td>{user.providerId}</td>
          </tr>
        </table>
      </div>

      <ReportList query={firestore.collection('reports').where('user', '==', username)} />
    </Sidebar>
  );
};

export default UserPage;
