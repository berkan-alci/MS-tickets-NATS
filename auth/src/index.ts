import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter, signInRouter, signUpRouter, signOutRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {  res.send('Hi there');});

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);


const start = async () => {
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
