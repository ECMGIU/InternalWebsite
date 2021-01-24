import Sidebar from 'layouts/Sidebar';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const TradesPage = () => {
  const [trades, loading, error] = useCollectionData(firestore.collection('trades').orderBy('date'));

  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <h1 className="title">Trades</h1>

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && 'Loading...'}

        {trades && (
          <div className="flex-1 inline-block h-full pr-2 overflow-y-auto">
            <table className="trades-table">
              <thead>
                <tr>
                  <th>Date & ID</th>
                  <th>Ticker & Action</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Commission</th>
                  <th>Fees</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((tr) => (
                  <tr>
                    <td className="text-sm">
                      <span className="font-semibold">{tr.date.toDate().toLocaleString()}</span>
                      <br />
                      {tr.id}
                    </td>
                    <td className="text-sm">
                      <span className="font-semibold">{tr.ticker}</span>
                      <br />
                      {tr.action}
                    </td>
                    <td>{tr.quantity || ''}</td>
                    <td>{tr.price || ''}</td>
                    <td>{tr.commission || ''}</td>
                    <td>{tr.fees || ''}</td>
                    <td>{tr.amount || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default TradesPage;
