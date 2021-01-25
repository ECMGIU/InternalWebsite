import { firestore } from 'lib/firebase';
import React, { useState } from 'react';
import AutosizeInput from 'react-input-autosize';

const CreateChannel = () => {
  const channelsRef = firestore.collection('channels');

  const [channelName, setChannelName] = useState('');
  const [editing, setEditing] = useState(false);

  const createChannel = async (e) => {
    e.preventDefault();

    await channelsRef.add({
      id: channelName,
      name: channelName,
    });

    setEditing(false);
    setChannelName('');
  };

  return (
    <div className="flex items-center">
      {editing ? (
        <form onSubmit={createChannel}>
          <AutosizeInput
            name="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            onBlur={(e) => { setEditing(false); e.target.blur(); }}
            placeholder="channel name"
          />
          <button type="submit">+</button>
        </form>
      ) : (
        <button type="button" onClick={(e) => setEditing(true)}>+</button>
      )}

    </div>
  );
};

export default CreateChannel;
