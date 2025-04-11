import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
      /** The authentication provider (facebook, google, etc.) */
      provider: string;
    } & DefaultSession["user"];
    /** The access token for the provider */
    accessToken?: string;
    /** The ID token for the provider */
    idToken?: string;
    /** The refresh token for the provider */
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's id */
    userId: string;
    /** The authentication provider (facebook, google, etc.) */
    provider: string;
    /** The access token for the provider */
    accessToken?: string;
    /** The ID token for the provider */
    idToken?: string;
    /** The refresh token for the provider */
    refreshToken?: string;
  }
}
