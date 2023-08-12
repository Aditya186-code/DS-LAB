const net = require('net');

class LamportTimestamp {
    constructor() {
        this.timestamp = 0;
    }

    increment() {
        this.timestamp++;
    }
}

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log('Machine A: Connected to Machine B');

    const lamportTimestamp = new LamportTimestamp();

    
    lamportTimestamp.increment();
    console.log('Machine A: Event 1 - Timestamp:', lamportTimestamp.timestamp);

    
    lamportTimestamp.increment()
    console.log('Machine A: Event 2 - Timestamp:', lamportTimestamp.timestamp);

    
    lamportTimestamp.increment();
    console.log('Machine A: Event 3 - Timestamp:', lamportTimestamp.timestamp);


    // Sending Lamport timestamp to Machine B
    client.write(lamportTimestamp.timestamp.toString());

    

    client.end();
});
