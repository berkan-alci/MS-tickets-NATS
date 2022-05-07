import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { requireAuth, validateRequest, InvalidRequestError, NotFoundError, AuthorizationError, OrderStatus } from '@tt-ms-common/common';
import { Order } from '../models';
import { stripe } from '../stripe';
router.post('/api/payments', requireAuth, [
    body('token')
        .not()
        .isEmpty()
        .withMessage('Token not provided'),
    body('orderId')
        .not()
        .isEmpty()
        .withMessage('Order ID not provided')
], validateRequest, async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new AuthorizationError();
    }

    if (order.status === OrderStatus.Cancelled) {
        throw new InvalidRequestError('Cannot pay for a cancelled order!');
    }

    await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token
    });

    res.status(201).send({ success: true });
})

export default router;