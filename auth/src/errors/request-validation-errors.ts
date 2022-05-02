import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';

export default class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) { 
        super('Error of type: RequestValidationError');

        Object.setPrototypeOf(this, RequestValidationError.prototype); //because extension built in class
    }

    serializeErrors() {
        return  this.errors.map((e) => {
            return { message: e.msg, field: e.param };
        });
    };
}
