import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from '@tt-ms-common/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models';
import { queueGroupName } from './qg-name';
import { TicketUpdatedPublisher } from '../index';

export default class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found!')
        };

        ticket.set({ orderId: undefined });
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