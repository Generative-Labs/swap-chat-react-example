import {
  Chat,
  Channel,
  ChannelList,
  CreateChannel,
  DashBoard,
  ContactList,
} from 'web3-mq-react';
import { Web3MQ } from 'web3-mq';
import ChannelHead from './components/ChannelHead';
import './App.css';
import 'web3-mq-react/dist/css/index.css';
import ChannelInner from './components/ChannelInner';
import Login from './components/Login';
import useLogin from './hooks/useLogin';

const App = () => {
  const { signMetamask, token } = useLogin();

  if (!token) {
    return <Login sign={signMetamask} />;
  }

  const client = Web3MQ.getInstance(token);
  return (
    <Chat client={client}>
      <DashBoard />
      <div className='channelContainer'>
        <ChannelHead />
        <ChannelList />
        <ContactList />
      </div>
      <Channel>
        <CreateChannel />
        <ChannelInner />
      </Channel>
    </Chat>
  );
};

export default App;
