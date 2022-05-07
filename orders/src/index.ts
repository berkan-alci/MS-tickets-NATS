import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { ExpirationCompleteListener, PaymentCreatedListener, TicketCreatedListener, TicketUpdatedListener } from './events';

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined!');
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined!');
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined!');
    }

    const url = process.env.MONGO_URI
    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        new ExpirationCompleteListener(natsWrapper.client).listen();
        new PaymentCreatedListener(natsWrapper.client).listen();
        await mongoose.connect(url);
        console.log('Connected to MongoDB - AUTH')
    } catch (err) {
        console.log(err);
    }



    app.listen(3000, async () => {
        console.log("TICKET-TICKETS-MS - PORT:3000" );
    });
};

start();
