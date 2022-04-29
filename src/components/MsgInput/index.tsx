import React, { useCallback, useState } from 'react';
import { ChatAutoComplete } from 'web3-mq-react';
import cx from 'classnames';

import OpenModal from '../../icons/OpenModal';
import TransferIcon from '../../icons/TransferIcon';
import SudoSwap from '../../icons/SudoswapIcon';
import WarningIcon from '../../icons/WarningIcon';

import Modal from '../Modal';
import useToggle from '../../hooks/useToggle';

import ss from './index.module.scss';

const operationConfigs = [
  {
    type: 'transfer',
    icon: <TransferIcon />,
  },
  {
    type: 'sudoswap',
    icon: <SudoSwap />,
  },
];

const MsgInput: React.FC = () => {
  const { visible, toggle } = useToggle();
  const [showModal, setShowModal] = useState<boolean>(false);

  const operationClicked = (type: string) => {
    console.log(type);
    setShowModal(true);
  };

  const RenderOperation = useCallback(() => {
    return (
      <div className={ss.operationContainer}>
        <div className={ss.operation}>
          {operationConfigs.map((item) => (
            <div
              className={ss.operaItem}
              key={item.type}
              onClick={() => operationClicked(item.type)}>
              <div className={ss.iconBox}>{item.icon}</div>
              <div className={ss.title}>{item.type}</div>
            </div>
          ))}
        </div>
        <div className={ss.warning}>
          <WarningIcon className={ss.icon} />
          General smart contract support is coming soon
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <div className={ss.inputBox}>
        <OpenModal
          className={cx(ss.auditBox, {
            [ss.close]: visible,
          })}
          onClick={toggle}
        />
        <ChatAutoComplete />
      </div>
      {visible && <RenderOperation />}
      <Modal
        visible={showModal}
        title='title'
        closeModal={() => {
          setShowModal(false);
        }}>
        <div>123</div>
      </Modal>
    </>
  );
};

export default MsgInput;
