import http from 'http';
import { Server } from 'socket.io';
import app from './app';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', data => {
    socket.to(data.room).emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

server.listen(process.env.PORT || 3333, () => console.log('Server on'));
