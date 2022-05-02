import { CustomError } from './custom-errors';

export default class AuthorizationError extends CustomError {
    statusCode = 401;

    constructor() { 
        super('Not authorized!');
        

        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not Authorized!'}]
    }; 
    
};