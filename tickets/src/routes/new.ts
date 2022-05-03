import express, { Request, Response } from 'express';
import { requireAuth } from '@tt-ms-common/common';
const router = express.Router();

router.post('/api/tickets', requireAuth, async (req: Request, res: Response) => {
    res.sendStatus(200);
});

export default router;

