var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
users=[];
connections=[];

server.listen(3000);
console.log('Its Connected!');
app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
})

io.sockets.on('connection',function(socket){
connections.push(socket);
console.log('Connected %s', connections.length);

//disconnect
socket.on('disconnect',function(data){
  // if(!socket.username) return;
  users.splice(users.indexOf(socket.username),1);
  updateUsernames();

  connections.splice(connections.indexOf(socket),1);
  console.log('Disconnected %s sockets connected', connections.length);

})
//sending messages
socket.on('send message',function(data){
  console.log(data);
io.sockets.emit('new message',{msg:data})
})
//new user
socket.on('new user',function(data,cb){
  cb(true);
  socket.username=data;
  users.push(socket.username);
  updateUsernames();
})
function updateUsernames(){
  io.sockets.emit('get users',users);
}
})
