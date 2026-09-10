const {io}=require('socket.io-client')
const path=require('path');
const fs=require('fs');
const { response } = require('express');
const socket=io("http://localhost:6969");
socket.on("connect",async ()=>{
    const arg=process.argv;
    const filePath=arg[2];
   
    socket.emit('file', {
        filePath: filePath
    },(response)=>{
        console.log(response.status);
        socket.close();
    });

})
