const { io } = require("socket.io-client");
const path=require('path');
const fs=require('fs');
const socket = io("http://LAPTOP-8VCLDCU2.local:6969");
socket.on('connect', () => {
  console.log('Connected to server over local network!');
  socket.emit('device_message', { hello: 'from second device' });
});

socket.on('ack', (response) => {
  console.log('Server acknowledged:', response);
});
socket.on('file',({fileName,fileData})=>{
  console.log(fileName);
  const writePath=path.join('/storage/emulated/0/Download',fileName);
  try{
    fs.writeFileSync(writePath,fileData);
  }
  catch(err){
    console.log(err);
  }
  finally{
    console.log('saved file');
  }
})
