var socket = io.connect();

var username = document.getElementById('username').innerHTML;
var lastTime = new Date();
var lastRanId = 1000000001;

socket.on("connect", function(data) {

});

socket.on('broadcast_msg', function(data) {
    $('#message-box').append(getHTMLNodeForMsg(data.user, data.time, data.msg));
});

var getHTMLNodeForMsg = function(user, time, msg) {
    var htmlNode = document.createElement('div');
    htmlNode.className = 'chat-body';
    htmlNode.innerHTML = '<div class="header">'
        + '<strong class="primary-font">' + user + '</strong>'
        + '<small class="time-text text-muted">'
        + time
        + '</small>'
        + '</div>'
        + '<p>' + msg + '</p>';
    return htmlNode.innerHTML;
};

var sendMsg = function() {
    var msg = document.getElementById('input-box').value;
    console.log(msg);
    if (msg != '') {
        socket.emit('send_msg', { name: username, msg: msg });
        document.getElementById('input-box').value = '';
    }
};

var viewHistory = function() {
    var childs = document.getElementById('message-box').childNodes;

    var postBody = { lastTime: lastTime, randomId: lastRanId };
    console.log(JSON.stringify(postBody));
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/get_history",
        contentType: "application/json",
        data: JSON.stringify(postBody),
        success: function(data, status) {
            if (status == 'success') {
                for (i = 0; i < data.msg.length; i++) {
                    var msgChunk = data.msg[i];
                    var newNode = getHTMLNodeForMsg(msgChunk.username, msgChunk.sentTime, msgChunk.content);
                    $(newNode).insertAfter("#history-row");
                }
                if (data.msg.length < 15) {
                    document.getElementById("btn-history").innerHTML = 'No more history.';
                    document.getElementById("btn-history").disabled = true;
                } else {
                    lastTime = new Date(data.msg[14].sentTime);
                }
                console.log(data);
                console.log('update last time: ' + lastTime);
            }
        }
    });
};