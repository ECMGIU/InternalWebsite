import RecentReportsRow from 'components/dashboard/RecentReportsRow';
import { firestore } from 'lib/firebase';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const RecentReports = () => {
  const reportsRef = firestore.collection('reports');
  const query = reportsRef.orderBy('createdAt', 'desc');
  const [reports, loading] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="w-full p-3 border border-black">
      <h2 className="mb-2 text-xl font-semibold">Recent Reports</h2>
      {loading && <p>Loading...</p>}
      {reports && (
        <div>
          { reports.map((r) => <RecentReportsRow report={r} />) }
        </div>
      )}
    </div>
  );
};

export default RecentReports;
