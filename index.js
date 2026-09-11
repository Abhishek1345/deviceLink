const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs=require('fs');
const path=require('path');
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8
});

io.on('connection', (socket) => {
  console.log(`Device connected: ${socket.id}`);

 
  socket.on('device_message', (data) => {
    console.log('Received:', data);
    socket.emit('ack', 'Message received over LAN!');
  });
  socket.on('file',({filePath},ack)=>{
    console.log(filePath);
  try{
     fs.readFile(filePath,(err,buffer)=>{
      console.log('reading file');
    if(err){
      console.log(err);
      ack({status:'ERR'});
    }
    ack({status:'OK'});
    socket.broadcast.emit('file',{
      fileName:path.basename(filePath),
      fileData:buffer
    });
  })
}
catch(err){
  console.log(err);
  ack({status:'ERR'});
}
  })

});
httpServer.listen(6969, '0.0.0.0', () => {
  console.log('Server running on port 6969');
}); 