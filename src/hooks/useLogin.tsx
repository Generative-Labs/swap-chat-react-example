import { useState } from 'react';
import { MetaMask } from 'web3-mq';

const useLogin = () => {
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const signMetamask = async () => {
    const token = await MetaMask.signMetaMask();
    setToken(token);
  };
  const logout = () => {
    localStorage.clear();
    setToken('');
  };

  return { token, signMetamask, logout };
};

export default useLogin;
