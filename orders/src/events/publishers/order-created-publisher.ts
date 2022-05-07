import { Publisher, Subjects, OrderCreatedEvent } from '@tt-ms-common/common';

export default class TicketUpdatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

