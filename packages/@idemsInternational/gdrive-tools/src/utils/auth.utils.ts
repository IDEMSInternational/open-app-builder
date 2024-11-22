import type { IAuthorizeOptions } from "../types";
import { AUTH_CREDENTIALS_PATH, AUTH_TOKEN_PATH } from "../paths";

/**
 * Small utility to extract common auth options and return the token and credential
 * paths, using fallback defaults if not provided
 */
export function getAuthPaths(options: IAuthorizeOptions) {
  const { authTokenPath = AUTH_TOKEN_PATH, credentialsPath = AUTH_CREDENTIALS_PATH } = options;
  return { authTokenPath, credentialsPath };
}
