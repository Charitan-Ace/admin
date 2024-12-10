import AuthService from "./services/AuthService";

export default class APIClient {
  baseURL: string;

  readonly auth: AuthService;

  constructor(baseURL = "/") {
    this.baseURL = baseURL;

    // common services
    this.auth = new AuthService(this);
  }

  // handle middleware/before-request here
  async get<T>(path: string, options?: RequestInit) {
    const url = new URL(path, this.baseURL);

    const response = await fetch(url, {
      ...options,
      method: "GET",
    });

    // TODO: standardized error class
    if (!response.ok || response.status >= 400) {
      throw new Error("Client error occurred");
    }

    const data = await response.json();

    return data as T;
  }

  async post<T>(path: string, options?: RequestInit) {
    const url = new URL(path, this.baseURL);

    const response = await fetch(url, {
      ...options,
      method: "POST",
    });

    // TODO: standardized error class
    if (!response.ok || response.status >= 400) {
      throw new Error("Client error occurred");
    }

    const data = await response.json();

    return data as T;
  }
}
