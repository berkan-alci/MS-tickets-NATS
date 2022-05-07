import OrderCreatedListener from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedEvent, OrderStatus } from '@tt-ms-common/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'concert',
        price: 15,
        userId: new mongoose.Types.ObjectId().toHexString(),
    });
    await ticket.save();

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        expiresAt: 'dfddpowfdf',
        ticket: {
            id: ticket.id,
            price: ticket.price,
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, ticket, data, msg };
}

it('sets the userId of the ticket', async () => {
    const { listener, ticket, msg, data } = await setup();

    await listener.onMessage(data, msg);

    const updated = await Ticket.findById(ticket.id);

    expect(updated!.orderId).toEqual(data.id)
});

it('acks the message', async () => {
    const { listener, msg, data } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { listener, ticket, data, msg } = await setup();
  
    await listener.onMessage(data, msg);
  
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  
    const ticketUpdatedData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
  
    expect(data.id).toEqual(ticketUpdatedData.orderId);
  });