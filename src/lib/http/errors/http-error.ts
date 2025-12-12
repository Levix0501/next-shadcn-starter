export class HttpError extends Error {
	public readonly url?: string;
	public readonly method?: string;
	public readonly statusCode: number;

	constructor(opts: {
		url?: string;
		method?: string;
		statusCode: number;
		message?: string;
	}) {
		super(opts.message ?? `HTTP Error ${opts.statusCode}`);
		Object.setPrototypeOf(this, HttpError.prototype);
		this.name = 'HttpError';

		this.url = opts.url;
		this.method = opts.method;
		this.statusCode = opts.statusCode;
	}

	public static fromRequest(request: Request, response: Response) {
		return new HttpError({
			url: response.url,
			method: request.method,
			statusCode: response.status,
			message: response.statusText
		});
	}
}
