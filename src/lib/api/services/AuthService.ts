import * as jose from "jose";
import APIClient from "@/lib/api/Client";
import { BaseService } from "@/lib/api/services/BaseService";

export default class AuthService extends BaseService {
  constructor(client: APIClient) {
    super(client);
  }

  /**
   * Authenticate an account with email and password
   *
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    const key = await this.encryptionKey();

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
   *
   * @param email
   * @param password
   * @param role
   * @param profile
   */
  async register(
    email: string,
    password: string,
    role: string,
    // TODO: properly typed profile
    profile: { [key: string]: unknown },
  ) {
    const key = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      // stringify JSON to create JWE claims
      new TextEncoder().encode(
        JSON.stringify({
          email,
          password,
          role,
          profile,
        }),
      ),
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, "RSA-OAEP-256"));

    return await this.client.post("/api/auth/register", {
      body: jwe,
    });
  }

  /**
   * Request email verification
   */
  async request() {
    return await this.client.post<boolean>("/api/auth/request");
  }

  async logout() {
    return await this.client.post<boolean>("/api/auth/logout");
  }

  async authenticated() {
    return await this.client.get<boolean>("/api/auth/authenticated");
  }

  /**
   * Send verification payload (for email verification)
   *
   * @param payload JWS-based payload as a string
   */
  async verify(payload: string) {
    return await this.client.post<boolean>(
      `/api/auth/verify?payload=${payload}`,
    );
  }

  /**
   * Gets encryption public key and its algorithm
   */
  private async encryptionKey() {
    return await this.client.get<jose.JWK>("/.well-known/jwk");
  }
}
