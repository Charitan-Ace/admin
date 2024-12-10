import APIClient from "../Client";

export abstract class BaseService {
  readonly client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }
}
