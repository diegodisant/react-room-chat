import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({
  username,
  setUsername,
  room,
  setRoom,
  chatSocket
}) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      chatSocket.emit(
        'join_room',
        {
          username,
          room,
        },
      );
    }

    navigate('/chat', { replace: true });
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Real Time Chat Rooms</h1>

        <input
          className={styles.input}
          placeholder="@username"
          onChange={(event) => {
            let userName = event.target.value;

            if (!userName.includes('@')) {
              userName = '@' + userName;
            }

            setUsername(userName);
          }}
        />

        <select
          className={styles.input}
          onChange={(event) => setRoom(event.target.value)}
        >
          <option>-- Select Room --</option>

          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="node">Node</option>
          <option value="react">React</option>
          <option value="cats">Cool Cats</option>
          <option value="dogs">Cool Dogs</option>
        </select>

        <button
          className="btn btn-outline"
          style={{ width: '100%'}}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  )
}

export default Home;
