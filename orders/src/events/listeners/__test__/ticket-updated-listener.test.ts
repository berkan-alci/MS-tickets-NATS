import TicketUpdatedListener from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedEvent } from '@tt-ms-common/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models';

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client)

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
    })
    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        version: ticket.version + 1,
        id: ticket.id,
        title: 'new concert',
        price: 120,
        userId: new mongoose.Types.ObjectId().toHexString()
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, ticket };
}

it('finds updates & saves a ticket', async () => {
    const { listener, data, msg, ticket } = await setup();
    await listener.onMessage(data, msg);
    const updated = await Ticket.findById(ticket.id);

    expect(updated!.title).toEqual(data.title);
    expect(updated!.price).toEqual(data.price);
    expect(updated!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if event skipped version number', async () => {
    const { msg, data, listener, ticket } = await setup();
    
    data.version = 5;
    
    try {
        await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
    
});