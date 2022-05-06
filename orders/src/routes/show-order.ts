import express, { Request, Response } from 'express';
import { AuthorizationError, NotFoundError, requireAuth } from '@tt-ms-common/common';
import { Order } from '../models';
const router = express.Router();

router.get('/api/orders/:orderId',requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new AuthorizationError();
    }
    
    res.send(order)
});

export default router;