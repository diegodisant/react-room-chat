import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ chatSocket }) => {
  const [ messagesReceived, setMessagesReceived ] = useState([]);

  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleString();
  }

  useEffect(() => {
    chatSocket.on('receive_message', (data) => {
      console.log(data);

      const { message, username, joinedAt } = data;

      setMessagesReceived((state) => [
        ...state,
        {
          message,
          username,
          joinedAt,
        }
      ]);

      return () => chatSocket.off('receive_message');
    }, [ chatSocket ]);
  });

  return (
    <div className={styles.messagesColumn}>
      {messagesReceived.map((msg, msgIndex) => (
        <div className={styles.message} key={msgIndex}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.joinedAt)}
            </span>
            <p className={styles.msgText}>
              { msg.message }
            </p>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
