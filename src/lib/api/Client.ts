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
  async send<T>(path: string, options?: RequestInit) {
    const url = new URL(path, this.baseURL);

    const response = await fetch(url, options);

    // TODO: standardized error class
    if (!response.ok || response.status >= 400) {
      throw new Error("Client error occurred");
    }

    const data = await response.json();

    return data as T;
  }
}
