// Import type augmentation for @testing-library/jest-dom
import '@testing-library/jest-dom';

// Extend Jest's expect
declare global {
  // Jest global
  declare const jest: typeof import('jest');
  declare const beforeEach: typeof import('jest')['beforeEach'];
  declare const afterEach: typeof import('jest')['afterEach'];
  declare const describe: typeof import('jest')['describe'];
  declare const it: typeof import('jest')['it'];
  declare const test: typeof import('jest')['test'];
  declare const expect: typeof import('jest')['expect'];

  // Testing Library types
  namespace jest {
    interface Matchers<R> {
      // jest-dom matchers
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
      toHaveStyle(style: Record<string, any>): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toHaveTextContent(text: string | RegExp): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(htmlText: string): R;
      toHaveFocus(): R;
      toHaveFormValues(values: Record<string, any>): R;
      toHaveValue(value: string | string[] | number): R;
      toBeInvalid(): R;
      toBeValid(): R;
      toBeRequired(): R;
      toBeEmptyDOMElement(): R;
    }
  }
}

// Required for TypeScript modules
export {}; 