import { useEffect, useState } from 'react';
import { Chat, Channel, DashBoard, Main } from 'web3-mq-react';
import { Web3MQ } from 'web3-mq';
import 'web3-mq-react/dist/css/index.css';

import ChannelInner from './components/ChannelInner';
import Login from './components/Login';
import useLogin from './hooks/useLogin';
import { AppTypeEnum } from 'web3-mq-react/dist/types/types';

const App = () => {
  const { signMetamask, token, logout } = useLogin();
  const [appType, setAppType] = useState<AppTypeEnum>(
    window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']
  );

  useEffect(() => {
    // 保证事件只挂载一次  避免重复render
    window.addEventListener('resize', () => {
      setAppType(
        window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']
      );
    });
  }, []);

  if (!token) {
    return <Login sign={signMetamask} />;
  }

  const client = Web3MQ.getInstance(token);
  return (
    <Chat client={client} appType={appType} logout={logout}>
      <DashBoard />
      <Main />
      <Channel>
        <ChannelInner />
      </Channel>
    </Chat>
  );
};

export default App;
