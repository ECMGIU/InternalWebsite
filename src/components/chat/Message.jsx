import PropTypes from 'prop-types';
import React from 'react';
import Linkify from 'react-linkify';

const Message = ({ author, text, createdAt }) => (
  <div className="flex space-x-2">
    <div className="font-bold">{author}</div>
    <div className="flex-1"><Linkify>{text}</Linkify></div>
    {createdAt && (<div className="w-40 text-right text-gray-500">{createdAt.toDate().toLocaleTimeString()}</div>)}
  </div>
);

Message.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: Date.isRequired,
};

export default Message;
