import { Listener, OrderCreatedEvent, Subjects } from "@tt-ms-common/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models";
import { queueGroupName } from "./qg-name";


export default class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version: data.version
        });

        await order.save();

        msg.ack();

    }
};