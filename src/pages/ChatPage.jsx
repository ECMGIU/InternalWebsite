// https://github.com/fireship-io/react-firebase-chat/blob/master/src/App.js

import ChannelSelect from 'components/chat/ChannelSelect';
import MessageInput from 'components/chat/MessageInput';
import MessageList from 'components/chat/MessageList';
import Sidebar from 'layouts/Sidebar';
import React, { useRef, useState } from 'react';

const ChatPage = () => {
  const scrollRef = useRef();
  const [channel, setChannel] = useState('main');

  return (
    <Sidebar>
      <div className="flex flex-col w-2/3 h-full">
        <h1 className="title">Chat</h1>
        <ChannelSelect active={channel} onSelect={setChannel} />
        <div className="flex-1 mt-4">
          <MessageList channel={channel} scrollRef={scrollRef} />
        </div>
        <MessageInput channel={channel} onSubmit={() => { scrollRef.current.scrollIntoView({ behavior: 'smooth' }); }} />
      </div>
    </Sidebar>
  );
};

export default ChatPage;
