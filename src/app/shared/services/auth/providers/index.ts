import { IAuthProvider } from "../types";
import { AuthProviderBase } from "./base.auth";
import { FirebaseAuthProvider } from "./firebase.auth";
import { SupabaseAuthProvider } from "./supabase.auth";

// TODO - optimise for production (only include provider used)
export const getAuthProvider = (name: IAuthProvider): AuthProviderBase => {
  switch (name) {
    case "firebase":
      return new FirebaseAuthProvider();
    case "supabase":
      return new SupabaseAuthProvider();
    default:
      console.warn("[Auth Provider] not configured for: ", name);
      return new AuthProviderBase();
  }
};
