import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';

const ReportListRow = ({ report }) => {
  const x = 'a';
  return (
    <div className="flex w-full">
      <div className="w-12 font-semibold">{report.ticker}</div>
      <div className="flex-1">{report.title}</div>
      <div />
    </div>
  );
};

ReportListRow.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createdAt: firebase.firestore.Timestamp,
    ticker: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default ReportListRow;
