import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@tt-ms-common/common';
import { Ticket } from '../../models';
import { queueGroupName } from './qg-name';

export default class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const {title, price } = data;
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error('Ticket not found!');
        }

        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    };
}