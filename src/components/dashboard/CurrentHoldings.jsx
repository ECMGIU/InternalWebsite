import CurrentHoldingsRow from 'components/dashboard/CurrentHoldingsRow';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const CurrentHoldings = () => {
  const portfoliosRef = firestore.collection('portfolios');
  const query = portfoliosRef.orderBy('createdAt', 'desc').limit(1);
  const [portfolio, loading] = useCollectionData(query, { idField: 'id' });
  const portfolioContents = portfolio ? portfolio[0].contents : {};

  return (
    <div className="p-3 border border-black">
      <h2 className="mb-2 text-xl font-semibold">Current Holdings</h2>
      {loading && <p>Loading...</p>}
      {portfolio
              && (
                <table className="table-auto">
                  {
                    Object.keys(portfolioContents)
                      .filter((x) => x[0] !== '-' && portfolioContents[x] > 0)
                      .map((x) => <CurrentHoldingsRow ticker={x} quantity={portfolioContents[x]} />)
                  }
                </table>
              )}
    </div>
  );
};

export default CurrentHoldings;
