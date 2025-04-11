// Minimal providers endpoint to avoid errors
export async function GET() {
  return new Response(JSON.stringify({
    google: {
      id: "google",
      name: "Google",
      type: "oauth",
      signinUrl: "/api/auth/signin/google",
      callbackUrl: "/api/auth/callback/google"
    },
    facebook: {
      id: "facebook",
      name: "Facebook",
      type: "oauth",
      signinUrl: "/api/auth/signin/facebook",
      callbackUrl: "/api/auth/callback/facebook"
    }
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
