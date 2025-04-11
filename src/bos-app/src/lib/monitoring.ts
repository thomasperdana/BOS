"use client";

// Monitoring and error tracking system

// Initialize error tracking
export const initErrorTracking = () => {
  if (typeof window === 'undefined') return;

  // Global error handler
  window.addEventListener('error', (event) => {
    captureError({
      type: 'uncaught_error',
      message: event.message,
      stack: event.error?.stack,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    captureError({
      type: 'unhandled_promise_rejection',
      message: event.reason?.message || String(event.reason),
      stack: event.reason?.stack,
    });
  });

  // React error boundary fallback
  console.error = (function(originalConsoleError) {
    return function(...args: any[]) {
      // Log to original console.error
      originalConsoleError.apply(console, args);

      // Capture React errors
      if (args[0] && typeof args[0] === 'string' && args[0].includes('React')) {
        captureError({
          type: 'react_error',
          message: args.join(' '),
        });
      }
    };
  })(console.error);
};

// Interface for error data
interface ErrorData {
  type: string;
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  metadata?: Record<string, any>;
}

// Capture and report errors
export const captureError = (errorData: ErrorData) => {
  // Add environment and user info
  const enhancedErrorData = {
    ...errorData,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    environment: process.env.NODE_ENV,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group('Error Captured');
    console.error(enhancedErrorData);
    console.groupEnd();
    return;
  }

  // In production, send to error tracking service
  sendToErrorTrackingService(enhancedErrorData);

  // Track in Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'error', {
      event_category: 'Error',
      event_label: errorData.type,
      value: 1,
    });
  }
};

// Send error to tracking service
const sendToErrorTrackingService = (errorData: ErrorData & { timestamp: string; url: string; userAgent: string; environment: string }) => {
  // This would normally send to a service like Sentry, LogRocket, etc.
  // For now, we'll just log to console
  const endpoint = process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT;

  if (!endpoint) return;

  // Send error data to endpoint
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(errorData),
    // Use keepalive to ensure the request completes even if the page is unloading
    keepalive: true,
  }).catch(err => {
    // Fallback if the error tracking service is down
    console.error('Failed to send error to tracking service:', err);
  });
};

// Performance monitoring
export const measurePerformance = (metricName: string, startTime: number) => {
  const duration = performance.now() - startTime;

  // Log performance metric
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'performance', {
      event_category: 'Performance',
      event_label: metricName,
      value: Math.round(duration),
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${metricName} - ${Math.round(duration)}ms`);
  }

  return duration;
};

// Web Vitals reporting
export const reportWebVitals = ({ id, name, label, value }: { id: string; name: string; label: string; value: number }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: label,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_id: id,
      metric_value: value,
      metric_delta: 0, // Calculate delta if tracking changes over time
    });
  }
};
