import { Listener, OrderCancelledEvent, Subjects, OrderStatus } from "@tt-ms-common/common"
import { Message } from "node-nats-streaming"
import { Order } from "../../models";
import { queueGroupName } from "./qg-name"


export default class OrderCancelledListener extends Listener <OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const order = await Order.findByEvent(data);

        if (!order) {
            throw new Error('Order not found!');
        }

        order.set({ status: OrderStatus.Cancelled });

        await order.save();
        msg.ack();
    }
}