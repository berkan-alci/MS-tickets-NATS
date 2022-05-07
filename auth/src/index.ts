import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    console.log('starting up');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    const url = process.env.MONGO_URI
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB - AUTH')
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, async () => {
        console.log("TICKET-AUTH-MS - PORT:3000" );
    });
};

start();
