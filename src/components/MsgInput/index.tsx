import React, { useCallback, useState } from 'react';
import { ChatAutoComplete } from 'web3-mq-react';
import cx from 'classnames';

import {
  OpenModalIcon,
  TransferIcon,
  SudoSwapIcon,
  WarningIcon,
} from '../../icons';
import transferImg from '../../image/commingSoonImg.png';

import Modal from '../Modal';
import SudoSwap from '../SudoSwap';
import useToggle from '../../hooks/useToggle';

import ss from './index.module.scss';

enum OperaTypeEnum {
  Transfer = 'Transfer',
  Sudoswap = 'Sudoswap',
}

const operationConfigs = [
  {
    type: OperaTypeEnum.Transfer,
    icon: <TransferIcon />,
  },
  {
    type: OperaTypeEnum.Sudoswap,
    icon: <SudoSwapIcon />,
  },
];

const MsgInput: React.FC = () => {
  const { visible, toggle } = useToggle();
  const [modalType, setModalType] = useState<string | undefined>(undefined);

  const operationClicked = (type: string) => {
    setModalType(type);
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
        <OpenModalIcon
          className={cx(ss.auditBox, {
            [ss.close]: visible,
          })}
          onClick={toggle}
        />
        <ChatAutoComplete />
      </div>
      {visible && <RenderOperation />}
      <Modal
        visible={modalType !== undefined}
        title={modalType}
        closeModal={() => {
          setModalType(undefined);
        }}>
        {modalType === OperaTypeEnum.Transfer && (
          <div className={ss.transferContainer}>
            <img src={transferImg} alt='' />
          </div>
        )}
        {modalType === OperaTypeEnum.Sudoswap && <SudoSwap />}
      </Modal>
    </>
  );
};

export default MsgInput;
