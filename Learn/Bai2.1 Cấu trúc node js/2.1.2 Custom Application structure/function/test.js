module.exports = (io, socket) => {
    console.log('co ng ket noi'  + socket.id);
    const createOrder = (payload) => {
        console.log('da createOrder');
    }

    const readOrder = (orderId, callback) => {
        console.log('da readOrder');
    }

    socket.on("order:create", createOrder);
    socket.on("order:read", readOrder);

    io.sockets.emit('server-send-val', socket.id);
 
}