/**
 * Central exports file for all application types
 * 
 * This file simplifies imports by providing a single entry point
 * for all type definitions used throughout the application.
 */

// Re-export types from other files
export * from './common';

// Navigation related types
export type { RouteKey, RoutePath } from '@/app/constants/routes';
export type { NavLink, SocialLink } from '@/app/constants/navigation';

/**
 * Common props for all form components
 */
export interface FormComponentProps {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Props for components with loading states
 */
export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Props for components with error states
 */
export interface ErrorProps {
  hasError?: boolean;
  errorMessage?: string;
}

/**
 * Button variant options
 */
export type ButtonVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive';

/**
 * Common alert types
 */
export type AlertType = 'info' | 'success' | 'warning' | 'error'; 