import { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  ChannelList,
  CreateChannel,
  DashBoard,
  ContactList,
} from 'web3-mq-react';
import { Web3MQ } from 'web3-mq';
import MessagingChannelListHeader from './components/MessagingChannelListHeader';
import './App.css';
import 'web3-mq-react/dist/css/index.css';
import ChannelInner from './components/ChannelInner';

function App() {
  const [token, setToken] = useState('');

  // get one time JWT
  useEffect(() => {
    fetch('https://chat.web3messaging.online/onetime_jwt')
      .then((response) => response.json())
      .then((data) => {
        setToken(data.data.access_token);
      });
  }, []);

  if (!token) {
    return null;
  }

  const client = Web3MQ.getInstance(token);
  return (
    <Chat client={client}>
      <DashBoard />
      <div className='channelContainer'>
        <MessagingChannelListHeader />
        <ChannelList />
        <ContactList />
      </div>
      <Channel>
        <CreateChannel />
        <ChannelInner />
      </Channel>
    </Chat>
  );
}

export default App;
