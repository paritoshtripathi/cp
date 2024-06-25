import fs from 'fs';
import path from 'path';

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else {
        return 'An unknown error occurred';
    }
}

export function logErrorDetailsToFile(error: unknown): void {
    const logFilePath = path.join(__dirname, 'error.log');
    const errorDetails = {
        message: getErrorMessage(error),
        stack: error instanceof Error ? error.stack : 'No stack available',
        // Using a simple approach to log error object
        errorObject: error instanceof Object ? Object.getOwnPropertyNames(error) : {}
    };
    fs.appendFileSync(logFilePath, JSON.stringify(errorDetails, null, 2) + '\n', 'utf8');
}
