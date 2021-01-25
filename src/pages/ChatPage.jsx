// https://github.com/fireship-io/react-firebase-chat/blob/master/src/App.js

import ChannelPicker from 'components/chat/ChannelPicker';
import MessageStream from 'components/chat/MessageStream';
import Sidebar from 'layouts/Sidebar';
import React, { useState } from 'react';

const ChatPage = () => {
  const [channel, setChannel] = useState('main');

  return (
    <Sidebar>
      <div className="flex flex-col w-2/3 h-full">
        <h1 className="title">Chat</h1>
        <ChannelPicker active={channel} callback={setChannel} />
        <div className="flex-1 mt-4">
          <MessageStream channel={channel} />
        </div>
      </div>
    </Sidebar>
  );
};

export default ChatPage;
