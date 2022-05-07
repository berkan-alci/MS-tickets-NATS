import { Publisher, Subjects, OrderCancelledEvent } from '@tt-ms-common/common';

export default class TicketUpdatedPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
