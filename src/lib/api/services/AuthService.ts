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
    const { key, alg } = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ email, password })),
    )
      .setProtectedHeader({ alg, enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, alg));

    return await this.client.send("/api/auth/login", { body: jwe });
  }

  /**
   * Registers an account optionally with profile data
   */
  async register(email: string, password: string, profile?: unknown) {
    const { key, alg } = await this.encryptionKey();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ email, password, profile })),
    )
      .setProtectedHeader({ alg, enc: "A256GCM" })
      .encrypt(await jose.importJWK(key, alg));

    console.log(jwe);

    return await this.client.send("/api/auth/register", {
      body: jwe,
    });
  }

  /**
   * Gets encryption public key and its algorithm
   */
  async encryptionKey() {
    const { key, alg } = await this.client.send<{
      key: jose.JWK;
      alg: string;
    }>("/api/auth/key");

    return { key, alg };
  }
}
