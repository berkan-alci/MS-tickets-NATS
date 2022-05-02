import { CustomError } from './custom-errors';

export default class InvalidRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) { 
        super(message);
        

        Object.setPrototypeOf(this, InvalidRequestError.prototype);
    }

    serializeErrors() {
        return [{
            message: this.message,

        }]
    };
};