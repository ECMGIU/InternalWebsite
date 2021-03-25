import ReportListRow from 'components/reports/ReportListRow';
import firebase from 'firebase/app';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ReportList = ({ query }) => {
  const [reports, loading] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="w-full p-3 border border-black">
      <h2 className="mb-2 text-xl font-semibold">Recent Reports</h2>
      {loading && <p>Loading...</p>}
      {reports && (
        <div>
          { reports.map((r) => <ReportListRow report={r} />) }
        </div>
      )}
    </div>
  );
};

ReportList.propTypes = {
  query: firebase.firestore.Query.isRequired,
};

export default ReportList;
