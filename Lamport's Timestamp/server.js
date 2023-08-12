const net = require('net');

class LamportTimestamp {
    constructor() {
        this.timestamp = 0;
    }

    increment() {
        this.timestamp++;
    }
}

const server = net.createServer(socket => {
    console.log('Machine B: Connection established with Machine A');

    const lamportTimestamp = new LamportTimestamp();

        // console.log('Machine B: Event 1 - Timestamp:', lamportTimestamp.timestamp);
        lamportTimestamp.increment();
        console.log('Machine B: Event 1 - Timestamp:', lamportTimestamp.timestamp);

    socket.on('data', data => {
        const receivedTimestamp = parseInt(data.toString());

        console.log('Machine B: Received Timestamp:', receivedTimestamp);

        lamportTimestamp.timestamp = Math.max(lamportTimestamp.timestamp, receivedTimestamp) + 1;

        console.log('Machine B: Event 4 - Timestamp:', lamportTimestamp.timestamp);

        socket.end();
    });
});

server.listen(3000, () => {
    console.log('Machine B listening on port 3000...');
});
