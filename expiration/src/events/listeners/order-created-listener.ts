import { Listener, OrderCreatedEvent, Subjects } from "@tt-ms-common/common";
import { Message } from "node-nats-streaming";
import expirationQueue from "../../queues/expiration-queue";
import { queueGroupName } from "./qg-name";

export default class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        
        await expirationQueue.add({
            orderId: data.id
        }, {
            delay
        });

        msg.ack();
    }
};