import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

interface AllProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper component that provides all the context providers needed for testing
 */
const AllProviders = ({ children }: AllProvidersProps) => (
  <>{children}</>
);

/**
 * Custom render function that wraps the component with all providers
 *
 * @param ui - The component to render
 * @param options - Additional render options
 * @returns The result of render with userEvent and other utilities
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const user = userEvent.setup();
  return {
    user,
    ...rtlRender(ui, { wrapper: AllProviders, ...options }),
  };
};

/**
 * Helper function to pause test execution for a specified duration
 *
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified duration
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render, wait, screen, fireEvent, waitFor, within }; 