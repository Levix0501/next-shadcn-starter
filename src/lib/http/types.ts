export type ErrorCode = string | number;

export type ApiResponse<T> =
	| { success: true; data: T }
	| { success: false; errorCode: ErrorCode; message: string; data: null };

export interface RequestConfig<D = unknown> extends RequestInit {
	data?: D;
}
