import firebase from 'firebase';
import { firestore } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ReportCard = ({ report }) => {
  const [feedback] = useCollectionData(firestore.collection('reports').doc(report.id).collection('feedback'), { idField: 'id' });

  return (
    <div className="mb-4 max-w-2xl">
      <a href={report.url} className="block border-black border">
        <div className="p-2 flex space-x-2">
          <div className="font-extrabold">{report.ticker}</div>
          <div className="flex-1">{report.title}</div>
          <div>{report.user}</div>
        </div>
      </a>
      {feedback && feedback.length > 0 && feedback.map((f) => (
        <div>
          <div className="border-black border text-sm -mt-px ml-6 py-1 px-2 inline-block">
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
    timestamp: firebase.firestore.Timestamp,
    ticker: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default ReportCard;
