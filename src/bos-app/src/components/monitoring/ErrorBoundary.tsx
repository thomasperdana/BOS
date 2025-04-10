import React, { Component, ErrorInfo, ReactNode } from 'react';
import { captureError } from '../../lib/monitoring';
import Button from '../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture error for monitoring
    captureError({
      type: 'react_error_boundary',
      message: error.message,
      stack: error.stack,
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 dark:text-white">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We apologize for the inconvenience. Our team has been notified of this issue.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-left overflow-auto max-w-full">
                <p className="text-red-600 dark:text-red-400 font-mono text-sm">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
            <div className="flex space-x-4">
              <Button variant="primary" onClick={this.handleRetry}>
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
