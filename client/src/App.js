import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import io from 'socket.io-client';
import Chat from './pages/chat';

const chatSocket = io.connect('http://localhost:4000');

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                chatSocket={chatSocket}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <Chat
                username={username}
                room={room}
                chatSocket={chatSocket}
              />
            }
          >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
