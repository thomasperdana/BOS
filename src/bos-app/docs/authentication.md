# Authentication System Documentation

The Bible Operating System (BOS) uses a multi-provider authentication system that supports the following authentication methods:

1. **Puter.js Authentication**: Uses the Puter.js cloud platform for authentication and data storage.
2. **Facebook Authentication**: Uses Facebook OAuth for authentication.
3. **Google Authentication**: Uses Google OAuth for authentication.

## Setup

### Environment Variables

The authentication system requires the following environment variables to be set:

```env
# Puter.js configuration
NEXT_PUBLIC_PUTER_APP_ID=bos-app
NEXT_PUBLIC_PUTER_API_KEY=your_puter_api_key

# NextAuth.js configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Facebook configuration
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Google configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Feature Flags
NEXT_PUBLIC_ENABLE_FACEBOOK_INTEGRATION=false
NEXT_PUBLIC_ENABLE_GOOGLE_INTEGRATION=true
```

### Feature Flags

The authentication system uses feature flags to enable or disable specific authentication providers:

- `NEXT_PUBLIC_ENABLE_FACEBOOK_INTEGRATION`: Enable or disable Facebook authentication.
- `NEXT_PUBLIC_ENABLE_GOOGLE_INTEGRATION`: Enable or disable Google authentication.

## Usage

### Authentication Context

The authentication system provides an `AuthContext` that can be used to access authentication-related functionality:

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { 
    user, 
    isLoading, 
    error, 
    signIn, 
    signInWithFacebook, 
    signInWithGoogle, 
    signOut 
  } = useAuth();

  // Use the authentication functions
}
```

### Authentication Providers

The authentication system provides the following authentication providers:

- `AuthProviders`: A wrapper component that provides both NextAuth.js and our custom AuthContext.
- `AuthContextProvider`: The actual AuthContext provider.

### Protected Routes

The authentication system provides a `ProtectedRoute` component that can be used to protect routes that require authentication:

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This page is protected and requires authentication</div>
    </ProtectedRoute>
  );
}
```

## Authentication Flow

1. The user visits the login page.
2. The user selects an authentication provider (Puter, Facebook, or Google).
3. The user is redirected to the authentication provider's login page.
4. After successful authentication, the user is redirected back to the application.
5. The application stores the user's information in the AuthContext.
6. The user can now access protected routes.

## Data Synchronization

The authentication system synchronizes user data across authentication providers. When a user signs in with any provider, the system:

1. Retrieves the user's basic information (ID, name, email, avatar).
2. Loads the user's profile from cloud storage.
3. If no profile exists, creates a default profile.
4. Stores the profile in the AuthContext.

## Logout

When a user signs out, the system:

1. Signs out from the current authentication provider.
2. Clears the user's information from the AuthContext.
3. Redirects the user to the login page.

## Error Handling

The authentication system provides error handling for authentication-related errors:

1. If an authentication error occurs, the error is stored in the AuthContext.
2. The error is displayed on the login page.
3. The user can try again with the same or a different authentication provider.

## Security Considerations

1. The authentication system uses JWT tokens for authentication.
2. The tokens are stored in HTTP-only cookies to prevent XSS attacks.
3. The system uses CSRF protection to prevent CSRF attacks.
4. The system uses secure HTTPS connections for all authentication-related requests.
5. The system uses environment variables to store sensitive information.
