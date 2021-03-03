import { auth, firestore, storage } from 'lib/firebase';
import React, { useRef, useState } from 'react';

const ReportForm = () => {
  const fileInputRef = useRef();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [ticker, setTicker] = useState('');
  const [working, setWorking] = useState(false);

  const reportsRef = firestore.collection('reports');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser.email.split('@')[0]; // TODO: ensure this still works after transition to IU Auth
    const time = new Date(); // Unix Timestamp

    const id = `RE_${ticker}_${time.getTime()}`;
    const ref = `/reports/${id}`;

    await storage.ref(ref).put(file);

    setWorking(true);

    await reportsRef.doc(id).set({
      user,
      ticker,
      createdAt: time,
      title,
      ref,
    });

    setTitle('');
    setTicker('');

    fileInputRef.current.value = '';
    setFile(null);

    setWorking(false);
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="space-y-2">
        <h2 className="text-xl font-bold">Add Report</h2>

        <div>
          <label className="inline-block w-24">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-1 border border-black" />
        </div>

        <div>
          <label className="inline-block w-24">Ticker</label>
          <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} className="p-1 border border-black" />
        </div>

        <div>
          <label className="inline-block w-24">Report PDF</label>
          <input ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <button type="submit" className={`inline-block w-auto px-4 py-1 font-semibold text-white bg-black ${working && 'animate-spinning'}`}>Submit</button>
      </form>
    </div>
  );
};

export default ReportForm;
