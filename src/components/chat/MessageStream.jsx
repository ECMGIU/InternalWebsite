import { auth, firestore } from 'lib/firebase';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Linkify from 'react-linkify';

const MessageStream = ({ channel }) => {
  const scrollRef = useRef();

  const messagesRef = firestore.collection('channels').doc(channel).collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [formValue, setFormValue] = useState('');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: new Date(),
      user: auth.currentUser.email.split('@')[0], // TODO: ensure this still works after transition to IU Auth
    });

    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    setFormValue('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll chat-scroll">
        {messages && messages.map((m) => (
          <div key={m.id} className="flex space-x-2">
            <div className="font-bold">{m.user}</div>
            <div className="flex-1"><Linkify>{m.text}</Linkify></div>
            {m.createdAt && (<div className="w-40 text-right text-gray-500">{m.createdAt.toDate().toLocaleTimeString()}</div>)}
          </div>
        ))}
        <span ref={scrollRef} />
      </div>

      <form onSubmit={sendMessage} className="flex pt-2">
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="message" className="flex-1 px-1 border border-black focus:outline-none" />
        <button type="submit" disabled={!formValue} className="text-white bg-black button">
          Send
        </button>
      </form>
    </div>
  );
};

MessageStream.propTypes = {
  channel: PropTypes.string.isRequired,
};

export default MessageStream;
