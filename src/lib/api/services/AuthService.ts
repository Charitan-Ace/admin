import * as jose from "jose";
import APIClient from "../Client";
import { BaseService } from "./BaseService";

export default class AuthService extends BaseService {
  constructor(client: APIClient) {
    super(client);
  }

  /**
   * Authenticate an account with email and password
   */
  async login(email: string, password: string) {
    const { key } = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      // stringify JSON to create JWE claims
      new TextEncoder().encode(JSON.stringify({ email, password })),
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    return await this.client.post("/api/auth/login", {
      body: jwe,
      credentials: "include",
    });
  }

  /**
   * Registers an account optionally with profile data
   */
  async register(email: string, password: string) {
    const { key } = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      // stringify JSON to create JWE claims
      new TextEncoder().encode(JSON.stringify({ email, password })),
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    return await this.client.post("/api/auth/register", {
      body: jwe,
      credentials: "include",
    });
  }

  /**
   * Gets encryption public key and its algorithm
   */
  async encryptionKey() {
    const { key, alg } = await this.client.get<{
      key: jose.JWK;
      alg: string;
    }>("/api/auth/key");

    return { key, alg };
  }
}
