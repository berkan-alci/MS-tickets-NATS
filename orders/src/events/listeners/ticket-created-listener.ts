import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@tt-ms-common/common';
import { Ticket } from '../../models';
import { queueGroupName } from './qg-name';

export default class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;
        const ticket = Ticket.build({
           id, title, price
        });
        await ticket.save();

        msg.ack();
    }
}