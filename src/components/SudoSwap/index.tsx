import { useCallback, useMemo } from 'react';
import { useInput } from '../../hooks/useInput';

import ss from "./index.module.scss";
import { assetDataUtils } from "@0x/order-utils";
import { convertTimestamp, getAssetsData } from "../../utils/sudoSwap";
import { useChatContext } from "web3-mq-react";
import { MsgTypeEnum } from "web3-mq";

interface IStep {
  step: number;
  content: React.ReactNode;
}

interface IProps {
  closeModal: () => void;
}

const SudoSwap: React.FC<IProps> = (props) => {
  const { closeModal } = props;
  const { input } = useInput("");
  const { value } = input;
  const { client } = useChatContext();

  const stepsMap: IStep[] = useMemo(
    () => [
      {
        step: 1,
        content: (
          <div className={ss.step1}>
            Go to
            <span
              onClick={() => {
                window.open('https://sudoswap.xyz/', '_blank');
              }}>
              Sudoswap
            </span>
          </div>
        ),
      },
      {
        step: 2,
        content: (
          <div className={ss.step2}>
            Look for
            <span>“recent swaps”</span>, click a swap you would like to share to
            chat.
          </div>
        ),
      },
      {
        step: 3,
        content: (
          <div>
            Once the swap opened, look for “trade code” copy and paste it on
            step 4.
          </div>
        ),
      },
      {
        step: 4,
        content: (
          <input
            {...input}
            placeholder='Enter trade code'
            className={ss.stepInput}
          />
        ),
      },
    ],
    [input]
  );

  const handleSubmit = useCallback(async () => {
    let sudoSwapData = await fetch(
      `https://chat.web3messaging.online/sudoswap/${value}`
    ).then((response) => response.json());
    const { code, data: tradeData } = sudoSwapData;
    if (code !== 0) {
      return null;
    }
    let asset1Data = await getAssetsData(
      assetDataUtils.decodeAssetDataOrThrow(tradeData.Order.takerAssetData)
    );
    let asset2Data = await getAssetsData(
      assetDataUtils.decodeAssetDataOrThrow(tradeData.Order.makerAssetData)
    );
    const res = {
      orderStatus: tradeData.Status,
      expiryDate: tradeData.Order.expirationTimeSeconds
        ? convertTimestamp(tradeData.Order.expirationTimeSeconds)
        : "",
      creatorAddress: tradeData.AccountId,
      recipientAddress:
        tradeData.Recipient === "0x0000000000000000000000000000000000000000"
          ? ""
          : tradeData.Recipient,
      jumpUrl: `https://sudoswap.xyz/#/swap/${value.substring(
        0,
        42
      )}/${value.substring(42)}`,
      asset1Data,
      asset2Data,
    };
    // todo 发送消息到聊天室
    client.mqtt.send(
      {
        to: client.channel.activeChannel?.room_id || "",
        msg_type: MsgTypeEnum.sudoSwapCard,
        msg_contents: res,
        from_uid: client.user.userInfo.user_id,
        belong_to_thread_id: client.messages.activeMessage
          ? client.messages.activeMessage.id
          : "",
        reply_to_msg_id: "",
      },
      () => {
        closeModal();
      }
    );
  }, [value]);

  const Steps = useCallback((item: IStep) => {
    const { step, content } = item;
    return (
      <div key={step} className={ss.stepContainer}>
        <div className={ss.circle}>{step}</div>
        <div className={ss.right}>
          <div className={ss.step}>{`Step ${step}`}</div>
          <div className={ss.content}>{content}</div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className={ss.container}>
      <div className={ss.title}>How to share a Sudoswap to chat</div>
      <div>{stepsMap.map(Steps)}</div>
      <div className={ss.submitBtn} onClick={handleSubmit}>
        Send to chat
      </div>
    </div>
  );
};

export default SudoSwap;
