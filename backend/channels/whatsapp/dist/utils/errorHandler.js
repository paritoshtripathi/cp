"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorDetailsToFile = exports.getErrorMessage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    else if (typeof error === 'string') {
        return error;
    }
    else {
        return 'An unknown error occurred';
    }
}
exports.getErrorMessage = getErrorMessage;
function logErrorDetailsToFile(error) {
    const logFilePath = path_1.default.join(__dirname, 'error.log');
    const errorDetails = {
        message: getErrorMessage(error),
        stack: error instanceof Error ? error.stack : 'No stack available',
        // Using a simple approach to log error object
        errorObject: error instanceof Object ? Object.getOwnPropertyNames(error) : {}
    };
    fs_1.default.appendFileSync(logFilePath, JSON.stringify(errorDetails, null, 2) + '\n', 'utf8');
}
exports.logErrorDetailsToFile = logErrorDetailsToFile;
