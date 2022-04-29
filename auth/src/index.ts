import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());


//routes
app.get('/', async (req, res) => {
    console.log('reached')
    res.send('Hi there');
});


app.get('/api/users/currentuser', async (req, res) => {
    console.log('reached')
    res.send('Hi there');
});



app.listen(4000, () => {
    console.log("TICKET-AUTH-MS : 4000 t" );
});