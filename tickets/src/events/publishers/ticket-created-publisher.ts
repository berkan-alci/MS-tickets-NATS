import { Publisher, Subjects, TicketCreatedEvent } from '@tt-ms-common/common';

export default class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

