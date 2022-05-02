import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, InvalidRequestError } from '../errors';
import { User } from '../models';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
], async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

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