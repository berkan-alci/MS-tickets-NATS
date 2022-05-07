import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();
    return ticket;
}


it('fetches orders for a particular user', async () => {
    const t1 = await buildTicket();
    const t2 = await buildTicket();
    const t3 = await buildTicket();

    const u1 = global.signin();
    const u2 = global.signin();

    await request(app)
        .post('/api/orders')
        .set('Cookie', u1)
        .send({ ticketId: t1.id })
        .expect(201);
    
    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', u2)
        .send({ ticketId: t2.id })
        .expect(201);

    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', u2)
        .send({ ticketId: t3.id })
        .expect(201);
    
    const res = await request(app)
        .get('/api/orders')
        .set('Cookie', u2)
        .expect(200);
    
    expect(res.body.length).toEqual(2)
    expect(res.body[0].id).toEqual(orderOne.id)
    expect(res.body[1].id).toEqual(orderTwo.id)
    expect(res.body[0].ticket.id).toEqual(t2.id)
    expect(res.body[1].ticket.id).toEqual(t3.id)
    

});