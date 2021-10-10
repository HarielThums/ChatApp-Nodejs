import { Button, TextField } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import './chat.css';
import { animateScroll } from "react-scroll";

interface socketConnection {
  room: string;
  socket: Socket;
  username: string;
}

interface message {
  time: string;
  room: string;
  author: string;
  message: string;
}

function Chat({ socket, username, room }: socketConnection) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<message[]>([]);

  const scrollToBottom =() => {
    animateScroll.scrollToBottom({
      containerId: "goToBottom",
      duration: 500,
    });
  }

  const sendMessage = () => {
    if (currentMessage) {
      const messageData: message = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      setCurrentMessage('');
      socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);



  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container" id="goToBottom">
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    {/* <p id="author">{messageContent.author}</p> */}
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <TextField
          id="outlined-basic"
          label=" Message..."
          variant="standard"
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <Button
          style={{ marginLeft: '10px' }}
          variant="contained"
          size="small"
          color="secondary"
          endIcon={<SendRounded />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
