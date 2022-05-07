import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { AuthorizationError, NotFoundError, validateRequest, requireAuth, InvalidRequestError } from '@tt-ms-common/common';
import { Ticket } from '../models';
import { natsWrapper } from '../nats-wrapper';
import { TicketUpdatedPublisher } from '../events';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({gt: 0})
        .withMessage('Price must be greater than zero')
], validateRequest, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new AuthorizationError();
    }

    if (ticket.orderId) {
        throw new InvalidRequestError('Cannot edit a reserved ticket!');
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        userId: ticket.userId,
        title: ticket.title,
        price: ticket.price
    });

    res.send(ticket);
});

export default router;