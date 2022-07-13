import { message } from 'antd';
import './index.less'

const key = 'updatable';

export const OpenMessage = (loadText, loadSuccessText) => {
  message.loading({
    content: loadText,
    key,
  });
  setTimeout(() => {
    message.success({
      content: loadSuccessText,
      key,
      duration: 2,
    });
  }, 1000);
};
