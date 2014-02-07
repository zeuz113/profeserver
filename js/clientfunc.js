var transmit = false;

var socket = new io.connect();
var ID;

socket.on('connect', function(){
  socket.emit('init', 1);
  
  socket.on('ID', function(data){
    ID = data;
    $("#status").html(ID+" Listo");
    $("#fade_status").hide();

  });

  socket.on('message', function(message){
    //
  });
  socket.on('pregunta', function(data,op1,op2,op3,op4){
     $("#txt_preg").html("Pregunta del profe: "+data);
     $("#op1").html(op1);
     $("#op2").html(op2);
     if(op3!=""){
     	$("#op3").html(op3);
     	$("#op3").show();
     }else{
     	$("#op3").hide();
     }
     if(op4!=""){
     	$("#op4").html(op4);
     	$("#op4").show();
     }else{
     	$("#op4").hide();
     }
     
     $("#fade_pregunta").show();
     navigator.notification.vibrate(500);
  });
  socket.on('disconnect', function(){
    //
  });

});

function send(x, y, z){
  var arr = [ID, x, y, z];
  socket.emit('input', arr);
}

function touchStart(){
	transmit = true;
	$('body').css('background-color', 'green');
}

function touchEnd(){
	transmit = false;
	$('body').css('background-color', 'blue');
}


    // The watch id references the current `watchAcceleration`
    var watchID = null;

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        startWatch();
    }

    // Start watching the acceleration
    //
    function startWatch() {

        // Update acceleration every 3 seconds
        var options = { frequency: 1 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
        if(transmit){
          send(acceleration.x, acceleration.y, acceleration.z);
        }
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }
    function send_test(){
    	socket.emit('test', ID);
    }

function resp(op){
  //navigator.notification.vibrate(500);
  socket.emit('resp', ID,op);
	$("#fade_pregunta").hide();
	
}

document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap esta listo y ahora ya se pueden hacer llamadas a PhoneGap
    //
    function onDeviceReady() {
    navigator.notification.vibrate(500);
        // Ahora es seguro usar la API PhoneGap
    }