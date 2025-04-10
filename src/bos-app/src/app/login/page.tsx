"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Facebook, Mail } from "lucide-react";
import { env } from "@/lib/env";

export default function LoginPage() {
  const { user, signIn, signInWithFacebook, signInWithGoogle, isLoading, error } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // If user is already logged in, redirect to study page
  useEffect(() => {
    if (user && !isLoading) {
      setIsRedirecting(true);
      router.push("/study");
    }
  }, [user, isLoading, router]);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (err) {
      console.error("Puter login failed:", err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      // For now, show a message about missing credentials
      alert("Facebook login requires valid OAuth credentials. Please set up Facebook OAuth credentials in your .env file.");
      console.log("Facebook login requires valid OAuth credentials");
      // Uncomment this when you have valid credentials
      // await signInWithFacebook();
    } catch (err) {
      console.error("Facebook login failed:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // For now, show a message about missing credentials
      alert("Google login requires valid OAuth credentials. Please set up Google OAuth credentials in your .env file.");
      console.log("Google login requires valid OAuth credentials");
      // Uncomment this when you have valid credentials
      // await signInWithGoogle();
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  if (isLoading || isRedirecting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bible Operating System</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bible Operating System</CardTitle>
          <CardDescription>Sign in to access your Bible study tools</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex flex-col space-y-4">
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with Puter
                </>
              )}
            </Button>

            {env.enableGoogleIntegration && (
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
            )}

            {env.enableFacebookIntegration && (
              <Button
                size="lg"
                variant="primary"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleFacebookSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Facebook className="mr-2 h-4 w-4" />
                    Sign in with Facebook
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p>
            Your data will be securely stored in Puter cloud storage.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
