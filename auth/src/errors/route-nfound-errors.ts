import { CustomError } from "./custom-errors";

export default class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Error of type: NotFoundError');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Route not found' }];
    };
};