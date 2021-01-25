import ChannelCreate from 'components/chat/ChannelCreate';
import { firestore } from 'lib/firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChannelSelect = ({ active, onSelect }) => {
  const channelsRef = firestore.collection('channels');
  const query = channelsRef.orderBy('name');

  const [channels] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="flex items-center px-2 py-1 border border-black space-x-4">
      <div className="font-bold">Channels</div>
      {channels && channels.map((c) => (
        <button type="button" className={active === c.name && 'font-bold'} onClick={(e) => onSelect(c.name)}>#{c.name}</button>
      ))}
      <ChannelCreate />
    </div>
  );
};

ChannelSelect.propTypes = {
  active: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ChannelSelect;
