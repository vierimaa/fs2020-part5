import React from 'react';

const Notification = ({ message }) => {
    if (message.content === null) {
      return null
    }
  
    return (
      <div className={message.type === 'error' ? 'error' : 'notification'}>
        {message.content}
      </div>
    )
  }

export default Notification;