import styles from './styles.module.css';
import MessagesReceived from './messages';

const Chat = ({ chatSocket }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived chatSocket={chatSocket} />
      </div>
    </div>
  )
}

export default Chat;
