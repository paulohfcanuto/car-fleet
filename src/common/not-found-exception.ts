export default class NotFoundException extends Error {
    statusCode: number;
    message: string;
    error: unknown | null;

    constructor(statusCode: number, message: string, error?: unknown) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
