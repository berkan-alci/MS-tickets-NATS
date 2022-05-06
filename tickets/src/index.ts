import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    const url = process.env.MONGO_URI
    try {
        await natsWrapper.connect('ticketing', 'randomstring', 'http://nats-srv:4222');
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        
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
