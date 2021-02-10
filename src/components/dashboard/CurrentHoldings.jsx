import { functions } from 'lib/firebase';
import React, { useState } from 'react';

const CurrentHoldings = () => {
  const [portfolio, setPortfolio] = useState(null);

  const portfolioFunction = functions.httpsCallable('trades-portfolio');
  portfolioFunction()
    .then((result) => setPortfolio(result.data.output))
    .catch((error) => { console.error(`error: ${JSON.stringify(error)}`); });

  return <div>{portfolio}</div>;
};

export default CurrentHoldings;
