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
            stompClient.subscribe('/user/queue/greetings', function (greeting) {
                var number = parseInt(JSON.parse(greeting.body).content);
                var received = "Number received: ";
                var sent = "Number sent: ";
                showMessage(received.concat(number));
                if(number === 2 || number === 3 || number === 4){
                   showMessage("You won !");
                   disconnect();
                } else {
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
                        disconnect();
                    }
                }
            });
        });
    }
}

function play() {
    var json = userProfile();
    var sendTo;
    var number = Math.floor((Math.random() * 100) + 2);
    var sent = "Number sent: "
    showMessage(sent.concat(number));
    send(number, "user");
    if(number === 2 || number === 3 || number === 4){
        showMessage("You lost !");
        disconnect();
    }
    //stompClient.send("/app/hello", {}, JSON.stringify({'number': number, 'sendTo' : sendTo}));
}

function send(number, sendTo){
    stompClient.send("/app/go3", {}, JSON.stringify({'number': number, 'sendTo' : sendTo}));
}

function showMessage(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

function userProfile(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/app/user", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).ready(function() { connect(); });
    $( "#play" ).click(function() { play(); });
});

