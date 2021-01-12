import Sidebar from 'layouts/Sidebar';
import { functions } from 'lib/firebase';
import React, { useState } from 'react';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);

  const portfolioFunction = functions.httpsCallable('trades-portfolio');
  portfolioFunction()
    .then((result) => setPortfolio(result.data.output))
    .catch((error) => { console.error(`error: ${JSON.stringify(error)}`); });

  return (
    <Sidebar>
      <h1 className="title">Portfolio</h1>
      {portfolio ? (
        <div><pre>{JSON.stringify(portfolio, null, 2)}</pre></div>
      ) : (
        <div>Nothing found</div>
      )}
    </Sidebar>
  );
};

export default PortfolioPage;
