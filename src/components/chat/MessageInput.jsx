import firebase from 'firebase/app';
import { auth } from 'lib/firebase';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const MessageInput = ({ messagesRef, onSubmit }) => {
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: new Date(),
      user: auth.currentUser.email.split('@')[0], // TODO: ensure this still works after transition to IU Auth
    });

    setFormValue('');
    onSubmit();
  };

  return (
    <form onSubmit={sendMessage} className="flex pt-2">
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="message" className="flex-1 px-1 border border-black focus:outline-none" />
      <button type="submit" disabled={!formValue} className="text-white bg-black button">
        Send
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  messagesRef: firebase.firestore.CollectionReference.isRequired,
  onSubmit: PropTypes.func,
};

MessageInput.defaultProps = {
  onSubmit: () => (null),
};

export default MessageInput;
