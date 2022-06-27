import { useEffect, useState } from 'react';
import { Chat, Channel, DashBoard, Main } from 'web3-mq-react';
import { Web3MQ } from 'web3-mq';
import 'web3-mq-react/dist/css/index.css';

import ChannelInner from './components/ChannelInner';
import Login from './components/Login';
import useLogin from './hooks/useLogin';

const App = () => {
  const { signMetamask, token, logout } = useLogin();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    // 保证事件只挂载一次  避免重复render
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 600);
    });
  }, []);

  if (!token) {
    return <Login sign={signMetamask} />;
  }

  const client = Web3MQ.getInstance(token);
  return (
    <Chat client={client} isMobile={isMobile} logout={logout}>
      <DashBoard />
      <Main />
      <Channel>
        <ChannelInner />
      </Channel>
    </Chat>
  );
};

export default App;
