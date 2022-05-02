import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    const url = "mongodb://auth-mongo-srv:27017/auth"
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
