import ReportCard from 'components/ReportCard';
import ReportForm from 'components/ReportForm';
import Sidebar from 'layouts/Sidebar';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ReportsPage = () => {
  const [reports, loading, error] = useCollectionData(firestore.collection('reports'), { idField: 'id' });

  return (
    <Sidebar>
      <h1 className="title">Reports</h1>

      <div className="border border-black">
        <ReportForm />
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}

      {reports && reports.map((r) => <ReportCard key={r.id} report={r} />)}
    </Sidebar>
  );
};

export default ReportsPage;
