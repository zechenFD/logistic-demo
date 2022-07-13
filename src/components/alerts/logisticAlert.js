import { Alert } from 'antd';
import React, { useState } from 'react';
import './logisticAlert.less'

const LogisticAlert = (props) => {
  const { alertMsg, alertType, alertShow, alertClose } = props;

  const handleClose = () => {
    alertClose();
  };

  return (
    <Alert message={alertMsg} showIcon type={alertType} closable afterClose={handleClose} />
  );
};

export default LogisticAlert;