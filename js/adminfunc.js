
var socket = new io.connect();

socket.on('connect', function(){
  socket.emit('init', 0);

  socket.on('message', function(message){
    //
  });

  socket.on('disconnect', function(){
    //
  });
  socket.on('userscount', function(num){
    $("#usercount").html(num);
  });



  socket.on('newController', function(socketID){
    //create new controlled object
    console.log('newController : ' + socketID)
    var el = document.createElement('div');
    el.className = "controlled";
    el.id = "controlled" + socketID;
    el.innerHTML = socketID;
    document.getElementById('field').appendChild(el);
  });

  socket.on('update', function(message){
    var ele = document.getElementById('controlled' + message[0]);
    var el = "#controlled" + message[0];
    var action = message[1];
    if(action == 'A'){
      var currentValue = parseInt($(el).css('left'));
      var newValue = currentValue - 1;
      $(el).css('left', newValue + "px");
    }
    else if(action == 'B'){
      var currentValue = parseInt($(el).css('left'));
      var newValue = currentValue + 1;
      $(el).css('left', newValue + "px");
    }

    //ele.innerHTML = "X: " + message[1] + "<br />Y: " + message[2] + "<br />Z: " + message[3];

    if(message[1] > 0){
      var currentValue = parseInt($(el).css('left'));
      var newValue = currentValue - (1 * message[1]);
      $(el).css('left', newValue + "px");
    }
    else{
      var currentValue = parseInt($(el).css('left'));
      var newValue = currentValue - (1 * message[1]);
      $(el).css('left', newValue + "px");
    }


    if(message[2] > 0){
      var currentValue = parseInt($(el).css('top'));
      var newValue = currentValue - (1 * message[2]);
      $(el).css('top', newValue + "px");
    }
    else{
      var currentValue = parseInt($(el).css('top'));
      var newValue = currentValue - (1 * message[2]);
      $(el).css('top', newValue + "px");
    }

    var display = document.getElementById('display');
    display.innerHTML = "X: " + message[1] + "<br />Y: " + message[2] + "<br />Z: " + message[3];
  });

  socket.on('destroy', function(socketIndex){
    var removeMe = document.getElementById("controlled" + socketIndex);
    console.log(removeMe);
    document.getElementById('field').removeChild(removeMe);
  });

});
function enviapreg(){
  var data=[];
  data["tx"]=$("#txpreg").val();
  //if(confirm( data["tx"])){
  
  data["op1"]="Si";
  data["op2"]="No";
  data["op3"]="";
  data["op4"]="";
  console.log(data);
  socket.emit('enviapreg', data["tx"],data["op1"],data["op2"],data["op3"],data["op4"]);
  //}
}


