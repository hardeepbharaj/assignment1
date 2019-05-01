import { notification } from 'antd';

// import { getLoggerForModule } from './appLogger';

// const localLogger = getLoggerForModule('utils/notifications');

notification.config({
  placement: 'topRight',
  top: 75,
  duration: 3,
});

const enums = {
  type: {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    DEFAULT: 'open',
  },
};

const alertNotifications = (message, title = 'Note:', type = enums.type.DEFAULT) => {
  notification[type]({
    message: title,
    description: message,
  });
};

const Notifications = {
  show: alertNotifications,
  type: enums.type,

};

export default Notifications;
