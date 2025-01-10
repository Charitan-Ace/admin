import { API_URL } from "./config";
import { ApiError } from "./error/ApiError";
import AuthService from "./services/AuthService";

export default class APIClient {
  baseURL: string;
  readonly auth: AuthService;

  constructor(baseURL = "/") {
    this.baseURL = baseURL;
    this.auth = new AuthService(this);
  }

  private handleError(response: Response) {
    throw new ApiError(response.status);
  }

  private getRequestOptions(
    options?: RequestInit,
    withCredentials?: boolean,
  ): RequestInit {
    return {
      ...options,
      ...(withCredentials && { credentials: "include" }),
    };
  }

  async get<T>(path: string, options?: RequestInit, withCredentials = true) {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options, withCredentials);

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

  async post<T>(path: string, options?: RequestInit, withCredentials = true) {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options, withCredentials);

    const response = await fetch(url, {
      ...requestOptions,
      method: "POST",
    });

    if (!response.ok) {
      this.handleError(response);
    }

    const data = await response.json();
    return data as T;
  }

  async put<T>(path: string, options?: RequestInit, withCredentials = true) {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options, withCredentials);

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

  async delete<T>(
    path: string,
    options?: RequestInit,
    withCredentials?: boolean,
  ) {
    const url = new URL(path, this.baseURL);
    const requestOptions = this.getRequestOptions(options, withCredentials);

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
