import PropTypes from 'prop-types';
import React from 'react';

const CurrentHoldingsRow = ({ ticker, quantity }) => {
  const x = 'a';
  return <tr><td className="font-semibold">{ticker}</td><td>{quantity}</td></tr>;
};

CurrentHoldingsRow.propTypes = {
  ticker: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CurrentHoldingsRow;
