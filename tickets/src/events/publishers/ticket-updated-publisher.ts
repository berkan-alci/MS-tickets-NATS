import { Publisher, Subjects, TicketUpdatedEvent } from '@tt-ms-common/common';

export default class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

