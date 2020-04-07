import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const createNotification = (type) => {
  return (message ='', title = '', timeout = 3000, callback = () => {}) => {
    switch (type) {
      case 'info':
        NotificationManager.info(message, title, timeout, callback);
        break;
      case 'success':
        NotificationManager.success(message, title, timeout, callback);
        break;
      case 'warning':
        NotificationManager.warning(message, title, timeout, callback);
        break;
      case 'error':
        NotificationManager.error(message, title, timeout, callback);
        break;
    }
  };
};

export default createNotification;
