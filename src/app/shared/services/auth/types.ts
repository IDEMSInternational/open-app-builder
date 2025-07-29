import type { IDeploymentConfig } from "packages/data-models";

export type IAuthProvider = IDeploymentConfig["auth"]["provider"];

export type ISignInProvider = "apple.com" | "google.com";

/**
 * Auth user profile. Should adhere to properties within openid spec
 * https://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims
 */
export type IAuthUser = {
  uid: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};
