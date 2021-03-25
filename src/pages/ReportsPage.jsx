import ReportCard from 'components/reports/ReportCard';
import ReportForm from 'components/reports/ReportForm';
import Sidebar from 'layouts/Sidebar';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ReportsPage = () => {
  const [reports, loading, error] = useCollectionData(firestore.collection('reports'), { idField: 'id' });

  return (
    <Sidebar>
      <h1 className="title">Reports</h1>

      <div className="max-w-2xl space-y-6">
        <div className="border border-black">
          <ReportForm />
        </div>

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}

        {reports && reports.map((r) => <ReportCard key={r.id} report={r} />)}
      </div>
    </Sidebar>
  );
};

export default ReportsPage;
