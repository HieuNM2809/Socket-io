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

    // setInterval(() => {
    //     io.sockets.emit('server-send-val', socket.id);
    // }, 0.00001);
 
}