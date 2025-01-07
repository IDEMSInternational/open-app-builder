import { Injector } from "@angular/core";
import { AuthProviderBase } from "./base.auth";
import { SupabaseService } from "src/app/shared/supabase/supabase.service";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuthProvider extends AuthProviderBase {
  private supabase: SupabaseClient;

  public override async initialise(injector: Injector) {
    this.supabase = injector.get(SupabaseService).supabase;
    if (!this.supabase) {
      throw new Error("[Supabase Auth] client not configured");
    }
    console.log("supabase auth init", this.supabase);
    this.addAuthListeners();
    // // use firebase authStateReady to ensure any previously logged in user is available
    // await getAuth().authStateReady();
  }

  public override async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({ provider: "google" });
    console.log({ data, error });
    return this.authUser();
  }

  public override async signOut() {
    throw new Error("Sign in not enabled");
    return this.authUser();
  }

  private addAuthListeners() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log("[AUTH]", event, session);
      if (session?.user) {
        this.authUser.set({ uid: session.user.id });
      } else {
        this.authUser.set(undefined);
      }

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
  }
}
