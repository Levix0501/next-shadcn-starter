import { ApiResponseError } from './errors/api-response-error';
import { HttpError } from './errors/http-error';
import { ApiResponse, RequestConfig } from './types';

export class HttpClient {
	private async request<T = unknown>(path: string, config?: RequestConfig) {
		const normalizedPath = path.startsWith('/') ? path : `/${path}`;

		const request = new Request(normalizedPath, {
			...config,
			headers: {
				...(config?.data instanceof FormData
					? {}
					: { 'Content-Type': 'application/json' }),
				...config?.headers
			},
			body:
				config?.data instanceof FormData
					? config.data
					: config?.data !== undefined
						? JSON.stringify(config.data)
						: undefined
		});

		const response = await fetch(request);

		if (!response.ok) {
			let errMessage: string;

			try {
				const errJson = await response.json();

				errMessage = errJson.errorMessage ?? response.statusText;
			} catch {
				errMessage = response.statusText;
			}

			throw HttpError.fromRequest(request, {
				...response,
				statusText: errMessage
			} as Response);
		}

		let result: ApiResponse<T>;

		try {
			result = (await response.json()) as ApiResponse<T>;
		} catch {
			throw new HttpError({
				url: response.url,
				method: request.method,
				statusCode: response.status,
				message: 'Invalid JSON response'
			});
		}

		if (result.success) {
			return result.data;
		}

		throw new ApiResponseError(result.errorCode, result.message);
	}

	get<T = unknown>(path: string, config?: RequestConfig) {
		return this.request<T>(path, { ...config, method: 'GET' });
	}

	post<T = unknown, D = unknown>(path: string, config?: RequestConfig<D>) {
		return this.request<T>(path, { ...config, method: 'POST' });
	}

	put<T = unknown, D = unknown>(path: string, config?: RequestConfig<D>) {
		return this.request<T>(path, { ...config, method: 'PUT' });
	}

	delete<T = unknown>(path: string, config?: RequestConfig) {
		return this.request<T>(path, { ...config, method: 'DELETE' });
	}
}
