import {WebSocketServer} from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws, request) {
  const url = request.url;//ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // "[ws://localhost:8080,token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9]"
  if(!url){
    return;
  }
  const queryParams=new URLSearchParams(url.split('?')[1]);
  const token=queryParams.get('token') || "";
  const decoded=jwt.verify(token,JWT_SECRET) as {userId:string};
  if(!decoded || !decoded.userId){
    ws.close();
    return;
  }
  ws.on('message', function message(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});