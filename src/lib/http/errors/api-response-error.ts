import { ErrorCode } from '../types';

export class ApiResponseError extends Error {
	public readonly errorCode: ErrorCode;

	constructor(errorCode: ErrorCode, message: string) {
		super(message ?? 'API Response Error');
		Object.setPrototypeOf(this, ApiResponseError.prototype);
		this.name = 'ApiResponseError';
		this.errorCode = errorCode;
	}
}
