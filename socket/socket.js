io.on('connection', (socket) => {
    let currentUser = {
        username: tempUsername,
        id: socket.id
    };

    connections.push(currentUser);
    console.log('Connected socket username: %s, ID: %s', currentUser.username, currentUser.id);
    console.log('Total sockets connected: %s', connections.length);
    socket.on('private-msg', (data) => {
        console.log('ID: %s, username: %s, msg: %s',data.id,data.username,data.msg);
        socket.to(data.id).emit('deliver', {username: data.username, msg: data.msg});
    });

    socket.on('disconnect', () => {
        for(let i =0; i<connections.length; i++) {
            if(connections[i].id == socket.id) {
                connections.splice(i,1);
            }
        }
        console.log('Disconnected. Connected Sockets: %s', connections.length);
    });
});
