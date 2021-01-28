import Sidebar from 'layouts/Sidebar';
import { firestore, functions } from 'lib/firebase';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const PortfolioPage = () => {
  const [status, setStatus] = useState('ready');

  const portfoliosRef = firestore.collection('portfolios');
  const query = portfoliosRef.orderBy('createdAt', 'desc').limit(1);
  const [portfolio, loading] = useCollectionData(query, { idField: 'id' });

  const updatePortfolio = () => {
    setStatus('working');
    functions.httpsCallable('trades-portfolio')().then((result) => {
      setStatus('ready');
    }).catch((error) => {
      setStatus('error');
    });
  };

  const buttonColors = {
    ready: 'bg-black',
    working: 'bg-gray-600 disabled',
    error: 'bg-red-700',
  };

  return (
    <Sidebar>
      <h1 className="title">Portfolio</h1>
      <button type="button" onClick={updatePortfolio} className={`px-2 py-1 font-bold text-white ${buttonColors[status]}`}>Update</button>
      {loading && <p>Loading...</p>}
      {portfolio
        && (
          <pre>
            {portfolio ? JSON.stringify(portfolio, null, 2) : '{}'}
          </pre>
        )}
    </Sidebar>
  );
};

export default PortfolioPage;
