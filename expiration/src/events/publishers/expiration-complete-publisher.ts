import { Publisher, Subjects, ExpirationCompleteEvent } from '@tt-ms-common/common';

export default class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}