import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';


import { InvalidRequestError } from '../errors';
import { validateRequest } from '../middlewares/validate-requests';
import { User } from '../models';


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
], validateRequest, async (req: Request, res: Response) => {
    

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new InvalidRequestError('Email already in use!');
    }

    const user = User.build({ email, password });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    //JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)
    
    req.session = {
        jwt: userJwt
    };
    
    return res.status(201).send(user);
    

});

export default router;