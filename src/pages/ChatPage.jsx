// https://github.com/fireship-io/react-firebase-chat/blob/master/src/App.js

import firebase from 'firebase';
import Sidebar from 'layouts/Sidebar';
import { auth, firestore } from 'lib/firebase';
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatPage = () => {
  const scrollRef = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [formValue, setFormValue] = useState('');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: auth.currentUser.email.split('@')[0], // TODO: ensure this still works after transition to IU Auth
    });

    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    setFormValue('');
  };

  return (
    <Sidebar>
      <h1 className="title">Chat</h1>
      <div className="flex flex-col w-2/3 h-full">
        <div className="flex-1 overflow-y-scroll chat-container">
          {messages
            && messages.map((m) => (
              <div className="flex space-x-2">
                <div className="font-bold">{m.user}</div>
                <div className="flex-1">{m.text}</div>
                <div className="text-gray-500">{m.createdAt.toDate().toLocaleTimeString()}</div>
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
    </Sidebar>
  );
};

export default ChatPage;
