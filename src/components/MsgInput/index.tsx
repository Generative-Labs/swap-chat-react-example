import React, { useCallback, useState } from "react";
import { ChatAutoComplete } from "web3-mq-react";
import useToggle from "../../hooks/useToggle";
import ss from "./index.module.scss";

import transferIcon from "../../assets/svg/transferIcon.svg";
import sudoswapIcon from "../../assets/svg/sudoswapIcon.svg";
import warningIcon from "../../assets/svg/warningIcon.svg";

import openIcon from "../../assets/svg/openModal.svg";
import closeIcon from "../../assets/svg/closeModal.svg";

const OPERA_TYPE_ENUM = {
  TRANSFER: "Transfer",
  SUDOSWAP: "Sudoswap",
};

const operationConfigs = [
  {
    type: OPERA_TYPE_ENUM.TRANSFER,
    icon: transferIcon,
  },
  {
    type: OPERA_TYPE_ENUM.SUDOSWAP,
    icon: sudoswapIcon,
  },
];

const MsgInput: React.FC = () => {
  const { visible, toggle } = useToggle();

  const operationClicked = (type: string) => {};

  const RenderOperation = useCallback(() => {
    return (
      <div className={ss.operationBox}>
        <div className={ss.operation}>
          {operationConfigs.map((operaItem) => {
            return (
              <div
                className={ss.item}
                onClick={() => operationClicked(operaItem.type)}
              >
                <div className={ss.iconBox}>
                  <img
                    src={operaItem.icon}
                    className={
                      operaItem.type === OPERA_TYPE_ENUM.SUDOSWAP
                        ? ss.sudoswapIcon
                        : ""
                    }
                    alt=""
                  />
                </div>
                <div className={ss.title}>{operaItem.type}</div>
              </div>
            );
          })}
        </div>
        <div className={ss.warning}>
          <img src={warningIcon} alt="" />
          General smart contract support is coming soon
        </div>
      </div>
    );
  }, [visible]);
  return (
    <>
      <div className={ss.inputBox}>
        <div className={ss.auditBox}>
          <img src={visible ? closeIcon : openIcon} onClick={toggle} alt="" />
        </div>
        <ChatAutoComplete />
      </div>
      {visible && <RenderOperation />}
    </>
  );
};

export default MsgInput;
