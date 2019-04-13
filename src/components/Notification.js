import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

function Notification() {

  /*
  function createNotification(type='info', msg="Nachricht") {
    // NotificationManager.info(message, title, timeOut, callback, priority);
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info(msg);
          break;
        case 'success':
          NotificationManager.success(msg, 'Title here');
          break;
        case 'warning':
          NotificationManager.warning(msg, 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error(msg, 'Click me!', 5000);
          break;
      }
    };
  }
  */

  return (
    <NotificationContainer/>
  )
}

export default Notification
