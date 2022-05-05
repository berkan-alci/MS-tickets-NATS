import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
    url:'http://localhost:4222'
});

// @ts-ignore
stan.on('connect', () => {
    console.log('publisher connected to nats');
});