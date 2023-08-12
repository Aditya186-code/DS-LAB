const net = require('net');

class Participant {
    constructor(port) {
        this.port = port;
    }

    start() {
        const server = net.createServer(socket => {
            console.log(`Participant at port ${this.port}: Connected to coordinator.`);

            socket.on('data', data => {
                const request = data.toString().trim();
                if (request === 'PREPARE') {
                    console.log(`Participant at port ${this.port}: Prepared to commit? (AGREE/DECLINE)`);
                    // Simulating user input here, but in a real system, this might come from a database or other sources
                    const data = Math.random()
                    // let response;
                    // if(data > 0.5){
                    //      response = 'AGREE';
                    // }
                    // else{
                    //      response = 'DECLINE'
                    // }
                    let response = 'DECLINE'
                    console.log("Response was ", response)
                    socket.write(response);
                }
            });

            socket.on('end', () => {
                console.log(`Participant at port ${this.port}: Connection closed.`);
            });
        });

        server.listen(this.port, () => {
            console.log(`Participant at port ${this.port}: Listening...`);
        });
    }
}

const participant1 = new Participant(4000);
const participant2 = new Participant(4001);

participant1.start();
participant2.start();
