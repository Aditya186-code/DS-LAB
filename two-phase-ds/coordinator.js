const net = require('net');

class Coordinator {
    constructor(participantPorts) {
        this.participantPorts = participantPorts;
        this.participants = [];
    }

    startTransaction() {
        this.participants = this.participantPorts.map(port => new net.Socket());

        this.participants.forEach((participant, index) => {
            participant.connect({ port: this.participantPorts[index], host: 'localhost' }, () => {
                console.log(`Coordinator: Connected to participant at port ${this.participantPorts[index]}`);
                participant.write('PREPARE');
            });

            participant.on('data', data => {
                const response = data.toString().trim();
                if (response === 'AGREE') {
                    console.log(`Coordinator: Participant at port ${this.participantPorts[index]} agreed.`);
                } else {
                    console.log(`Coordinator: Participant at port ${this.participantPorts[index]} declined.`);
                    this.abortTransaction();
                }
            });
        });
    }

    commitTransaction() {
        this.participants.forEach(participant => {
            participant.write('COMMIT');
            participant.end();
        });
        console.log('Coordinator: Transaction committed.');
    }

    abortTransaction() {
        this.participants.forEach(participant => {
            participant.write('ABORT');
            participant.end();
        });
        console.log('Coordinator: Transaction aborted.');
    }
}

const coordinator = new Coordinator([4000, 4001]);
coordinator.startTransaction();
setTimeout(() => coordinator.commitTransaction(), 3000); // Simulating commit after a delay
