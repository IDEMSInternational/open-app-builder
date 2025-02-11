import type { IDeploymentConfig } from "packages/data-models";
import type { FirebaseAuthUser } from "./providers/firebase.auth";

export type IAuthProvider = IDeploymentConfig["auth"]["provider"];

export type IAuthUser = { uid: string } | FirebaseAuthUser;
