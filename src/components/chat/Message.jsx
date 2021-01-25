import PropTypes from 'prop-types';
import React from 'react';
import Linkify from 'react-linkify';

const Message = ({ message }) => (
  <div key={message.id} className="flex space-x-2">
    <div className="font-bold">{message.user}</div>
    <div className="flex-1"><Linkify>{message.text}</Linkify></div>
    {message.createdAt && (<div className="w-40 text-right text-gray-500">{message.createdAt.toDate().toLocaleTimeString()}</div>)}
  </div>
);

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
    text: PropTypes.string,
    createdAt: Date,
  }).isRequired,
};

export default Message;
