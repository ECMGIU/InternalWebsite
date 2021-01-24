import firebase from 'firebase';
import { firestore } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ReportCard = ({ report }) => {
  const [feedback] = useCollectionData(firestore.collection('reports').doc(report.id).collection('feedback'), { idField: 'id' });

  return (
    <div className="max-w-2xl mb-4">
      <a href={report.url} className="block border border-black">
        <div className="flex p-2 space-x-2">
          <div className="font-extrabold">{report.ticker}</div>
          <div className="flex-1">{report.title}</div>
          <div>{report.user}</div>
        </div>
      </a>
      {feedback && feedback.length > 0 && feedback.map((f) => (
        <div>
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
    timestamp: firebase.firestore.Timestamp,
    ticker: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default ReportCard;
