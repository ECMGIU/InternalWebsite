import firebase from 'firebase';
import Sidebar from 'layouts/Sidebar';
import { firestore } from 'lib/firebase';
import React, { useState } from 'react';

const parseAction = (action) => {
  if (action.includes('BOUGHT')) {
    return 'buy';
  } if (action.includes('SOLD')) {
    return 'sell';
  } if (action.includes('DIVIDEND RECEIVED')) {
    return 'dividend received';
  } if (action.includes('REINVESTMENT')) {
    return 'reinvestment';
  } if (action.includes('DISTRIBUTION')) {
    return 'distribution';
  } if (action.includes('EXPIRED')) {
    return 'option expiration';
  }
  return 'unknown'; // we should never get here
};

const FidelityInputPage = () => {
  const [formValue, setFormValue] = useState('');
  const [status, setStatus] = useState('');

  let startTime;

  const sendLines = async (e) => {
    e.preventDefault();

    startTime = performance.now();

    setStatus('Parsing CSV data');

    // Break CSV into 2d-array
    let trades = formValue.split(/\r?\n/).map((l) => l.split(','));

    // Remove whitespace around each "cell"
    trades = trades.map((row) => row.map((cell) => cell.trim()));

    // Filter out "trades" without a date (preamble and postamble)
    // or without a ticker(cash changes: check recieved, adjustment, etc.)
    trades = trades.filter((tr) => tr[0].match(/^\d{2}\/\d{2}\/\d{4}/) && tr[2].length > 0);

    setStatus('Converting rows to objects');

    // Map everything to objects
    trades = trades.map((tr) => {
      const tradeDate = new Date(tr[0]);
      const epochDate = tradeDate.getTime() / 1000;

      const action = parseAction(tr[1]);

      return {
        id: `TR_${tr[2]}_${action.substring(0, 1).toUpperCase()}_${epochDate}`, // TODO: Prove these will not collide (I think they will)
        date: firebase.firestore.Timestamp.fromDate(tradeDate),
        ticker: tr[2].toUpperCase(), // They're already uppercase, but just to be sure
        action,
        quantity: parseFloat(tr[5]),
        price: parseFloat(tr[6]),
        commission: parseFloat(tr[7]),
        fees: parseFloat(tr[8]),
        amount: parseFloat(tr[10]),
      };
    });

    setStatus('Writing to Database');

    const tradesRef = firestore.collection('trades');
    const batch = firestore.batch();
    trades.forEach((tr) => {
      batch.set(tradesRef.doc(tr.id), tr, { merge: true });
    });
    batch.commit()
      .then(() => {
        setFormValue('');
        setStatus(`Added ${trades.length} trades in ${((performance.now() - startTime) / 1000).toFixed(2)}s`);
      });
  };

  return (
    <Sidebar>
      <h1 className="title">Fidelity Data Input</h1>

      <form onSubmit={sendLines}>
        <textarea value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="paste data here" className="w-full h-80 border-black border p-2 focus:outline-none" />
        <div className="flex space-x-4 items-center text-gray-500">
          <button type="submit" disabled={!formValue} className="button bg-black text-white">Upload</button>
          <div className={status === 'Done' ? 'text-green-600' : ''}>{status}</div>
        </div>
      </form>
    </Sidebar>
  );
};

export default FidelityInputPage;
