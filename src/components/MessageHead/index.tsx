import { Avatar } from 'web3-mq-react';
import logo from '../../image/photo-1546820389-44d77e1f3b31.jpeg';
import './index.css';

const MessageHead = () => {
  return (
    <div className="head_container">
      <Avatar name="shiny-darkness-5" image={logo} size={40} />
      <div>Social Demo</div>
    </div>
  );
};

export default MessageHead;
