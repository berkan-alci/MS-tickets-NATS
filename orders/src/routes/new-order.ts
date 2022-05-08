import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { NotFoundError, InvalidRequestError, OrderStatus, requireAuth, validateRequest } from '@tt-ms-common/common';
import { Ticket, Order } from '../models';
import { OrderCreatedPublisher } from '../events';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();
const EXPIRATION_SECONDS = 1 * 60;
router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string)=> mongoose.Types.ObjectId.isValid(input)) 
        .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
    //find ticket user is tryin to order
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
        throw new InvalidRequestError('Ticket has already been reserved!');   
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_SECONDS);

    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
    });
    
    await order.save();
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        },
    });
    res.status(201).send(order);
});

export default router;