import nats, { Message } from 'node-nats-streaming';
// @ts-ignore
import { randomBytes } from 'crypto';

console.clear();

//Monitoring: localhost:8222/streaming
//Go to channels & add ?sub=[num] to query for more info

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});


// @ts-ignore
stan.on('connect', () => {
    console.log('listener connected to NATS')

    // @ts-ignore
    stan.on('close', () => {
        console.log('NATS connection closed');
        //@ts-ignore
        process.exit();
    });


    const options = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('orders-service');
    const sub = stan.subscribe('ticket:created', 'orders-service-QG', options);

    // @ts-ignore
    sub.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }

        msg.ack();
    });
});

//@ts-ignore
process.on('SIGINT', () => stan.close());
//@ts-ignore
process.on('SIGTERM', () => stan.close());