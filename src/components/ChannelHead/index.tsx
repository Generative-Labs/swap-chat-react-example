import React from 'react';
import { Avatar, useChatContext } from 'web3-mq-react';
import { CreateChannelIcon } from '../../icons/CreateChannelIcon';
import image from '../../image/photo-1546820389-44d77e1f3b31.jpeg';
import './index.css';

const MessagingChannelListHeader: React.FC = React.memo((props) => {
  const { client, showCreateChannel, setShowCreateChannel } = useChatContext();

  const { id, name = 'Example User' } = (client.user as any) || {};

  return (
    <div className={'messaging__channel-list'}>
      <div className='messaging__channel-list__header'>
        <Avatar image={image} name={name} size={40} />
        <div className={`messaging__channel-list__header__name`}>
          {name || id}
        </div>
        <button
          className={`messaging__channel-list__header__button`}
          onClick={() => {
            setShowCreateChannel(!showCreateChannel);
          }}>
          <CreateChannelIcon />
        </button>
      </div>
    </div>
  );
});

export default React.memo(MessagingChannelListHeader);
