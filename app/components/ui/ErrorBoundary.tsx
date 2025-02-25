"use client";

import { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /**
   * Content to display when an error occurs.
   * If not provided, a default error UI will be shown.
   */
  fallback?: ReactNode;

  /**
   * The components that this error boundary wraps
   */
  children: ReactNode;

  /**
   * Optional callback for when errors are caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * A component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <div className="p-6 mx-auto my-8 max-w-2xl rounded-lg border border-red-200 bg-red-50">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Algo correu mal
          </h2>
          <p className="text-red-600 mb-4">
            Ocorreu um erro ao renderizar esta parte da interface. Por favor, tente recarregar a página.
          </p>
          {this.state.error && (
            <pre className="p-4 bg-white border border-red-100 rounded overflow-auto text-sm text-gray-800">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 