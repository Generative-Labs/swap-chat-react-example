import { Window, MessageInput, MessageList, Thread, MessageHeader } from 'web3-mq-react';

import logo from '../../image/photo-1546820389-44d77e1f3b31.jpeg';

// const PropMessage = () => {
//   return <div>PropMessage</div>;
// };

const ChannelInner = () => {
  return (
    <>
      <Window>
        <MessageHeader avatarName="shiny-darkness-5" avatarImg={logo} avatarSize={40} title="Social Demo" />
        {/* <MessageList Message={PropMessage} /> */}
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </>
  );
};

export default ChannelInner;
