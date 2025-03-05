import { AuthProviderBase } from "./base.auth";

export class SupabaseAuthProvider extends AuthProviderBase {
  /**
   * When signing in to google with supabase additional request may be required
   * to get personal profile info (TBC)
   */
  private async getGoogleUserInfo(accessToken: string) {
    if (!accessToken) return;
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfo = await response.json();
      const { given_name, family_name } = userInfo;
      this.authUser.update((v) => ({ ...v, given_name, family_name }));
      return userInfo;
    } catch (error) {
      console.error("[Auth] Error fetching Google user info:", error);
    }
  }
}
