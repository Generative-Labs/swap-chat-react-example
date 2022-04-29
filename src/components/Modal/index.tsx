import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';

import CloseBtn from '../../icons/CloseBtnIcon';

import ss from './index.module.scss';

interface IProps {
  visible: boolean;
  closeModal: () => void;
  modalHeader?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  dialogClassName?: string;
  title?: string;
}

const Modal = (props: PropsWithChildren<IProps>) => {
  const {
    visible,
    closeModal,
    modalHeader,
    children,
    style = {},
    className = '',
    title = '',
    dialogClassName = '',
  } = props;
  const [active, setActive] = useState<boolean>(false);
  const [aniClassName, setAniClassName] = useState<string>('');
  const [contentClassName, setContentClassName] = useState<string>('');

  const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);

  const onTransitionEnd = () => {
    setAniClassName(visible ? 'enterDone' : 'exitDone');
    setContentClassName(visible ? 'contentEnterDone' : 'contentExitDone');
    if (!visible) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      setActive(true);
      setAniClassName('enter');
      setContentClassName('contentEnter');
      setTimeout(() => {
        setAniClassName('enterActive');
        setContentClassName('contentEnterActive');
      });
    } else {
      document.body.style.overflow = bodyOverflow.current;
      setAniClassName('exit');
      setContentClassName('contentExit');
      setTimeout(() => {
        setAniClassName('exitActive');
        setContentClassName('contentExitActive');
      });
    }
    return () => {
      document.body.style.overflow = bodyOverflow.current;
    };
  }, [visible]);

  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (!visible && !active) {
    return null;
  }
  return createPortal(
    <div
      style={style}
      className={cx(ss.modal, ss[aniClassName], className)}
      onTransitionEnd={onTransitionEnd}
      onClick={handleClick}>
      <div className={cx(ss.dialog, dialogClassName, ss[contentClassName])}>
        {modalHeader || (
          <div className={ss.titleContainer}>
            <CloseBtn onClick={closeModal} className={ss.closeBtn} />
            <div className={ss.title}>{title}</div>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default React.memo(Modal);
