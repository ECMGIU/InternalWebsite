import Message from 'components/chat/Message';
import { firestore } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MessageList = ({ channel, scrollRef }) => {
  const messagesRef = firestore.collection('channels').doc(channel).collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="h-full overflow-y-scroll chat-scroll">
      {messages && messages.map((m) => <Message message={m} />)}
      <span ref={scrollRef} />
    </div>
  );
};

MessageList.propTypes = {
  channel: PropTypes.string.isRequired,
  scrollRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]).isRequired,
};

export default MessageList;
