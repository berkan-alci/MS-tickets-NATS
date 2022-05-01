import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter, signInRouter, signUpRouter, signOutRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';


const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {  res.send('Hi there');});

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(errorHandler);


app.listen(3000, () => {
    console.log("TICKET-AUTH-MS - PORT:3000" );
});