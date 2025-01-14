import { API_URL } from "./config";
import { ApiError } from "./error/ApiError";
import AuthService from "./services/AuthService";
import AssetsService from "./services/AssetsService";

export default class APIClient {
  baseURL: string;
  readonly auth: AuthService;
  readonly assets: AssetsService;

  constructor(baseURL = "/") {
    this.baseURL = baseURL;
    this.auth = new AuthService(this);
    this.assets = new AssetsService(this);
  }

  private handleError(response: Response) {
    throw new ApiError(response.status);
  }

  private getRequestOptions(options?: RequestInit): RequestInit {
    return {
      ...options,
      credentials: "include",
    };
  }

  async get<T>(
    path: string,
    options?: RequestInit & { params?: Record<string, unknown> },
  ): Promise<T> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url, {
      ...requestOptions,
      method: "GET",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();
    return data as T;
  }

  async post<T>(
    path: string,
    options?: RequestInit & {
      params?: Record<string, unknown>;
      headers?: Record<string, string>;
      returnHeaders?: boolean;
    },
  ): Promise<T | { data: T; headers: Record<string, string> }> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url, {
      ...requestOptions,
      headers: options?.headers,
      method: "POST",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();

    if (options?.returnHeaders) {
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return { data: data as T, headers };
    }

    return data as T;
  }

  async postText(path: string, options?: RequestInit): Promise<string> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    const response = await fetch(url, {
      ...requestOptions,
      method: "POST",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    return response.text();
  }

  async put<T>(path: string, options?: RequestInit): Promise<T> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    const response = await fetch(url, {
      ...requestOptions,
      method: "PUT",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();
    return data as T;
  }

  async patch<T>(path: string, options?: RequestInit): Promise<T> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    const response = await fetch(url, {
      ...requestOptions,
      method: "PATCH",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();
    return data as T;
  }

  async delete<T>(path: string, options?: RequestInit): Promise<T> {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options);

    const response = await fetch(url, {
      ...requestOptions,
      method: "DELETE",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();
    return data as T;
  }
}

const apiClient = new APIClient(API_URL);
export { apiClient };
