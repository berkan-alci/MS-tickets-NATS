import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@tt-ms-common/common';
import { Ticket } from '../models';
import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events';
const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({gt: 0})
        .withMessage('Price must be greater than zero')
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });

    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        userId: ticket.userId,
        title: ticket.title,
        price: ticket.price
    });
    res.status(201).send(ticket);
});

export default router;

