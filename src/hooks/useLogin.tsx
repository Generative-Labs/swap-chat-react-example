import React, { useRef, useState } from "react";
import { getLoginRandomSecret, login } from "web3-mq";
import { Buffer } from "buffer";

const useLogin = () => {
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const signMetamask = async () => {
    let address: string = "";
    //@ts-ignore
    const requestPermissionsRes = await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    if (!requestPermissionsRes) {
      return null;
    }

    //@ts-ignore
    let accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (!accounts) {
      return null;
    }
    address = accounts[0];

    const { data: secret } = await getLoginRandomSecret({
      wallet_address: address,
    });
    const msg = `0x${Buffer.from(secret, "utf8").toString("hex")}`;
    // @ts-ignore
    const signRes = await ethereum.request({
      method: "personal_sign",
      params: [msg, address, "swapchat"],
    });
    //
    // login_random_secret: string;
    // signature: string;
    // wallet_address: string;
    // appid?: string;

    const { access_token } = await login({
      login_random_secret: secret,
      signature: signRes,
      wallet_address: address,
    });
    setToken(access_token);
  };
  const logout = () => {
    localStorage.removeItem('token')
  }

  return { token, signMetamask, logout };


};

export default useLogin;
