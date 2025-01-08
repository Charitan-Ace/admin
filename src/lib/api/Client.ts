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

  async login(email: string, password: string): Promise<void> {
    await this.auth.login(email, password);
  }

  // TODO: fix this auth
  async isAuthenticated(): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return localStorage.getItem("isAuthenticated") === "true";
  }
}

const apiClient = new APIClient("http://localhost:8080");
export { apiClient };
