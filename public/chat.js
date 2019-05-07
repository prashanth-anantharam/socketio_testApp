//Make a connection to server.
var socket = io.connect('http://localhost:4000');

//Query DOM.
var message = document.getElementById('message'),
    handle  = document.getElementById('handle'),
    btn     = document.getElementById('send'),
    output  = document.getElementById('output'),
    feedback= document.getElementById('feedback');

//Step 1) Emit events from this socket to the server.
//Step 2) in server code.
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
});

//Step 3.  Handled broadcasted message from server.
socket.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data+ 'is typing a message ...</em></p>';
});
