import { Server as SocketIoServer } from 'socket.io';
import { jwtVerify } from './utils/jwt/jwtVerify.js';

export const ws = new SocketIoServer({
  cors: {
    origin: '*'
  }
});

export const configureSocketIoServer = ({ JWT_SECRET }) => {
  
  ws.use(async (socket, next) => {
  
    const { authToken } = socket.handshake.auth;
  
    if(authToken){
      try{
        //verify authToken
        const payload = await jwtVerify(authToken, JWT_SECRET)
        socket.data.payload = payload;
        console.log('here\'s the verified payload', payload);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next(new Error('credentials_required'))
    }

  })
  
  ws.on('connection', async socket => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.join(socket.data.payload.id);
    const socketsInRoom = await ws.in(socket.data.payload.id).fetchSockets();
    console.log(`User ${socket.data.payload.id} has ${socketsInRoom.length} existing connections:`, socketsInRoom.map(s => s.id));
    socket.on('disconnect', async () => {
      const socketsInRoom = await ws.in(socket.data.payload.id).fetchSockets();
      console.log(`User ${socket.data.payload.id} has ${socketsInRoom.length} existing connections:`, socketsInRoom.map(s => s.id))
      console.log('🔥: A user disconnected');
    });
  });

}

