/**
 * Created by gouthamvidyapradhan on 27/08/2017.
 * app.js
 */
var stompClient = null;
var connected = null;

function setConnected(con) {
    connected = con;
}

function connect() {
    if(connected != true){
        var json = userProfile();
        if(json.admin === true){
            document.getElementById("play").style.visibility="visible";
        } else{
            document.getElementById("play").style.visibility="hidden";
        }

        var socket = new SockJS('/go3-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/user/queue/message', function (message) {
                var number = parseInt(JSON.parse(message.body).content);
                var received = "Number received: ";
                var sent = "Number sent: ";
                if(number === 2 || number === 3 || number === 4){
                    showMessage(received.concat(number));
                    if(number === 2){
                        showMessage("2 + 1 = 3; 3 / 3 = 1");
                    } else if(number === 3){
                        showMessage("3 / 3 == 1");
                    } else {
                        showMessage("4 - 1 = 3; 3 / 3 = 1");
                    }
                    showMessage("You won !");
                    reset(json.admin === true);
                } else if(number === -1){
                    showMessage("You lost !");
                }
                 else {
                    showMessage(received.concat(number));
                    if(number % 3 === 0){
                        number = number / 3;
                    } else if((number + 1) % 3 === 0){
                        number = (number + 1) / 3;
                    } else {
                        number = (number - 1) / 3;
                    }
                    send(number, json.admin === true ? "user" : "admin");
                    showMessage(sent.concat(number));
                    if(number === 2 || number === 3 || number === 4){
                        showMessage("You lost !");
                        reset(json.admin === true);
                    }
                }
            });
        });
    }
}

function play() {
    document.getElementById("play").disabled = true;
    var json = userProfile();
    var sendTo;
    var number = Math.floor((Math.random() * 1000) + 1);
    showMessage("Game started with random number: " + number);
    if(number === 1){
        showMessage("You won !");
        send(-1, "user");
    } else{
        var sent = "Number sent: "
        showMessage(sent.concat(number));
        send(number, "user");
        if(number === 2 || number === 3 || number === 4){
            showMessage("You lost !");
            reset(true);
        }
    }
}

function send(number, sendTo){
    stompClient.send("/app/go3", {}, JSON.stringify({'number': number, 'sendTo' : sendTo}));
}

function showMessage(message) {
    $("#message").append("<tr><td>" + message + "</td></tr>");
}

function userProfile(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/app/user", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function reset(isAdmin) {
    if(isAdmin){
        document.getElementById("play").disabled = false
    }
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).ready(function() { connect(); });
    $( "#play" ).click(function() { play(); });
});

