import { appError } from '../types/errorType';

export function isAppError(error: object): error is appError { 
    return (error as appError).type !== undefined;
}