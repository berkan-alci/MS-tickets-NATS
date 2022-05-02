import { CustomError } from './custom-errors';

export default class DatabaseConnectionError extends CustomError {
    reason = 'Error: DatabaseConnectionError';
    statusCode = 500;

    constructor() { 
        super('Error of type: DatabaseConnectionError');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{
            message: this.reason,

        }]
    };
}
