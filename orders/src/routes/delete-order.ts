import express, { Request, Response } from 'express';
import { requireAuth, OrderStatus, NotFoundError, AuthorizationError } from '@tt-ms-common/common';
import { Order, Ticket } from '../models';
import { OrderCancelledPublisher } from '../events';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new AuthorizationError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
            id: order?.ticket.id
        },
    });
    res.status(204).send(order);
});

export default router;