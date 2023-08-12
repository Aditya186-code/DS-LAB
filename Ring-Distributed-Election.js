class Node {
    constructor(id) {
        this.id = id;
        this.act = true;
    }
}
    
class RingAlgo {
    constructor() {
        this.TotalProcess = 0;
        this.process = [];
    }
    
    initialiseRingAlgo() {
        console.log("No of processes 5");
        this.TotalProcess = 5;
        for (let i = 0; i < this.TotalProcess; i++) {
        this.process[i] = new Node(i);
        }
    }
    
    Election() {
        console.log(`Unfortunately node ${failure_node} fails`)
        this.process[failure_node].act = false
        console.log(`Election Initiated by ${start_node}`);

        let initializedProcess = start_node;
    
        let old = initializedProcess;
        let newer = (old + 1) % this.TotalProcess;
    
        while (true) {
        if (this.process[newer].act) {
            console.log(
            "Process " + this.process[old].id +
            " pass Election(" + this.process[old].id +
            ") to" + this.process[newer].id
            );
            old = newer;
        }
    
        newer = (newer + 1) % this.TotalProcess;
        if (newer === initializedProcess) {
            break;
        }
        }
    
        console.log("Process " + this.process[this.FetchMaximum()].id + " becomes coordinator");
        let coord = this.process[this.FetchMaximum()].id;
    
        old = coord;
        newer = (old + 1) % this.TotalProcess;
    
        while (true) {
        if (this.process[newer].act) {
            console.log(
            "Process " + this.process[old].id +
            " pass Coordinator(" + coord +
            ") message to process " +
            this.process[newer].id
            );
            old = newer;
        }
        newer = (newer + 1) % this.TotalProcess;
        if (newer === coord) {
            console.log("End Of Election ");
            break;
        }
        }
    }
    
    FetchMaximum() {
        let Ind = 0;
        let maxId = -9999;
        for (let i = 0; i < this.process.length; i++) {
        if (this.process[i].act && this.process[i].id > maxId) {
            maxId = this.process[i].id;
            Ind = i;
        }
        }
        return Ind;
    }
    }
    failure_node = 4
    start_node = 3
    
    const object = new RingAlgo();
    object.initialiseRingAlgo();
    object.Election();
    // this code is contributed by writer
    