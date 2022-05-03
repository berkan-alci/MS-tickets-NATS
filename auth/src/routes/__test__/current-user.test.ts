import request from 'supertest';
import { getAuthCookie } from '@tt-ms-common/common';
import { app } from '../../app';

it('responds with details about current user', async () => {
  
    const cookie = await getAuthCookie();

    const res = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send({})
        .expect(200);
    
    expect(res.body.currentUser.email).toEqual('test@test.com')
});

it('responds with null if user isn\'t authenticated', async () => {
    const res = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    
    expect(res.body.currentUser === null)
});