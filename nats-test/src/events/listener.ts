import nats, { Message, Stan } from 'node-nats-streaming';

export abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private stan: Stan;
    protected ackWait = 5 * 1000;

    constructor(stan: Stan) {
        this.stan = stan;
    }

    subOpts() {
        return this.stan.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };

    listen() {
        const subscription = this.stan.subscribe(this.subject, this.queueGroupName, this.subOpts());

        //@ts-ignore
        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
};