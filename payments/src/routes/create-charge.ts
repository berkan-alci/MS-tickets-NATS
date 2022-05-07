import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { requireAuth, validateRequest, InvalidRequestError, NotFoundError } from '@tt-ms-common/common';

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
    res.send({ success: true });
})

export default router;