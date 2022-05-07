import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from '@tt-ms-common/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models';
import { queueGroupName } from './qg-name';
import { TicketUpdatedPublisher } from '../index';

export default class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found!')
        };

        ticket.set({ orderId: data.id });
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version,
          });
        msg.ack();
    }
}