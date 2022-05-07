import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@tt-ms-common/common";
import { queueGroupName } from "./qg-name";
import { Order } from "../../models";
import { Message } from "node-nats-streaming";
export default class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new Error('Order not found!');
        }

        order.set({
            status: OrderStatus.Complete
        });
        await order.save();

        msg.ack();
    }
}