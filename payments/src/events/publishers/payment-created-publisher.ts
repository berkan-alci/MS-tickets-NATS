import { PaymentCreatedEvent, Publisher, Subjects } from "@tt-ms-common/common";

export default class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
};