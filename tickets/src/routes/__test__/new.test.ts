import request from 'supertest';
import { app } from '../../app';
import { getAuthCookie } from '@tt-ms-common/common';

it('route handler listening to /api/tickets for post requests', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .send({});
    
    expect(res.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .send({})
    
    expect(res.status).toEqual(401);
    
});

it('returns other status code if user is signed in', async () => {
    const cookie = await getAuthCookie();
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({});
    console.log(res);
    
    expect(res.status).not.toEqual(401);
    
});

it('returns an error if invalid price is provided', async () => {
    
});

it('creates a ticket with valid input params', async () => {
    
});