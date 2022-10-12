export interface ISuccessResult<T> {
    isSuccess: true;
    result: T | undefined;
}

export interface IErrorResult<ErrorType = Error | unknown> {
    isSuccess: false;
    error: ErrorType;
}

export const withResult = <T>(data: T | undefined): ISuccessResult<T> => ({ isSuccess: true, result: data });
export const withError = (error: Error | unknown): IErrorResult => ({ isSuccess: false, error });