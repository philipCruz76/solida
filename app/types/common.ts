import { ReactNode } from 'react';

/**
 * Basic props for components that accept children
 */
export interface ChildrenProps {
  children: ReactNode;
}

/**
 * Common HTML attributes often used in components
 */
export interface CommonHTMLAttributes {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

/**
 * Utility type that makes all properties optional and allows for additional properties
 */
export type Loose<T> = {
  [P in keyof T]?: T[P];
} & Record<string, any>;

/**
 * Utility type for defining size variants
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Utility type for defining status variants
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Utility type for defining responsive breakpoints
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Basic props for image components
 */
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Type for application color variants
 */
export type ColorVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'gray'; 