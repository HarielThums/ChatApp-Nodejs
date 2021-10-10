import './App.css';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import io, { Socket } from 'socket.io-client';
import Chat from './chat/Chat';

const socket: Socket = io('http://localhost:3333');

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', room);
    }

    setLoggedIn(true);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div>
          <h1>Join a Chat now</h1>
          <TextField
            style={{ marginRight: '10px' }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField id="outlined-basic" label="Room" variant="outlined" onChange={(event) => setRoom(event.target.value)} />
          <Button style={{ marginLeft: '10px', padding: '15px 20px' }} variant="contained" size="large" color="info" onClick={joinRoom}>
            Join Room
          </Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
