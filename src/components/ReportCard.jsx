import { firestore, storage } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const ReportCard = ({ report }) => {
  // TODO: Why is idField needed?
  const [feedback] = useCollectionData(firestore.collection('reports').doc(report.id).collection('feedback'), { idField: 'id' });
  const [downloadUrl] = useDownloadURL(storage.ref(report.ref));

  return (
    <div className="mb-4">
      <a key={report.id} href={downloadUrl || '#'} className="block border border-black">
        <div className="flex p-2 space-x-2">
          <div className="font-extrabold">{report.ticker}</div>
          <div className="flex-1">{report.title}</div>
          <div>{report.user}</div>
        </div>
      </a>
      {feedback && feedback.length > 0 && feedback.map((f) => (
        <div key={f.id}>
          <div className="inline-block px-2 py-1 ml-6 -mt-px text-sm border border-black">
            <span className="font-bold">{f.user}</span> {f.body}
          </div>
        </div>
      ))}
    </div>
  );
};

ReportCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    timestamp: firestore.Timestamp,
    ticker: PropTypes.string,
    ref: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default ReportCard;
