var http = require('http');
var express = require('express');
var socket = require('socket.io');
var DB = require('./database');
var puerto =1234

var app = express();
app.use("/imgs", express.static(__dirname + '/imgs'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/rmm", express.static(__dirname + '/rmm'));
app.use("/js", express.static(__dirname + '/js'));
var server = http.createServer(app).listen((puerto), function(){
  console.log("Express server on - Port: "+puerto);
});


var io = socket.listen(server);
io.set('log level', 1);
app.get('/index', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/controller.html', function(req, res){
  res.sendfile(__dirname + '/controller.html');
});

app.get('/gyro.html', function(req, res){
  res.sendfile(__dirname + '/gyro.html');
});
app.get('/client', function(req, res){
  res.sendfile(__dirname + '/client.html');
});

app.get('/cordova-2.0.0.js', function(req, res){
  res.sendfile(__dirname + '/cordova-2.0.0.js');
});

var nextId = 0;
var display;
var sockets = [];

io.sockets.on('connection', function(socket){
    var address = socket.handshake.address;
    console.log("Conexion: " + address.address + ":" + address.port + " => id "+socket.id + " transp: "+io.transports[socket.id].name);

  socket.on('init', function(data){
    console.log(data);
    if(data === 0){
      display = socket;
    }
    else{
      sockets[nextId] = socket;
      sockets[nextId].emit('ID', nextId);
      //display.emit('newController', nextId);
      display.emit('userscount', sockets.length);
      nextId++;
    }
  });

  socket.on('input', function(input){
    display.emit('update', input);
  });

  socket.on('test', function(input){
    console.log("test ok");
    console.log(input);
    socket.emit('pregunta',"test ask","si","no","","");
    //DB.test();
  });

  socket.on('enviapreg', function(datos,op1,op2,op3,op4){
    console.log("enviando pregunta");
    console.log(datos);
    console.log(op1);
    console.log(op2);
    socket.broadcast.emit('pregunta',datos,op1,op2,op3,op4);
  });
  socket.on('resp', function(id,resp){
    console.log("enviando Respuesta");
    console.log(id);
    console.log(resp);   
    //display.emit('respuesta',id,resp);
  });

  socket.on('disconnect', function(){
    var socketIndex = sockets.indexOf(socket);

    //display.emit('destroy', socketIndex);
    console.log("DESTROY: " + socketIndex);
    sockets.splice(socketIndex, 1);
    display.emit('userscount', sockets.length);
  });

});
