// Type definitions for @testing-library/react
declare module '@testing-library/react' {
  import { ReactElement } from 'react';
  
  export interface RenderResult {
    container: HTMLElement;
    baseElement: HTMLElement;
    debug: (baseElement?: HTMLElement | HTMLElement[]) => void;
    rerender: (ui: ReactElement) => void;
    unmount: () => void;
    asFragment: () => DocumentFragment;
    findByText: (text: string | RegExp) => Promise<HTMLElement>;
    findAllByText: (text: string | RegExp) => Promise<HTMLElement[]>;
    // Add more methods as needed
  }
  
  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType<{children: React.ReactNode}>;
  }
  
  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult & {
    [key: string]: any;
  };
  
  export function cleanup(): void;
  
  export const fireEvent: {
    [key: string]: (element: HTMLElement, options?: any) => boolean;
    click: (element: HTMLElement) => boolean;
    change: (element: HTMLElement, options: any) => boolean;
    submit: (element: HTMLElement) => boolean;
    // Add more events as needed
  };
  
  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string, options?: any) => HTMLElement;
    getByLabelText: (labelText: string | RegExp) => HTMLElement;
    getByPlaceholderText: (placeholderText: string | RegExp) => HTMLElement;
    getByAltText: (alt: string | RegExp) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    getAllByText: (text: string | RegExp) => HTMLElement[];
    getAllByRole: (role: string) => HTMLElement[];
    queryByText: (text: string | RegExp) => HTMLElement | null;
    // Add more query methods as needed
  };
  
  export function within(element: HTMLElement): typeof screen;
  
  export function waitFor<T>(
    callback: () => T | Promise<T>,
    options?: any
  ): Promise<T>;
}

// Type definitions for @testing-library/user-event
declare module '@testing-library/user-event' {
  export interface UserEvent {
    click: (element: HTMLElement) => Promise<void>;
    type: (element: HTMLElement, text: string) => Promise<void>;
    keyboard: (text: string) => Promise<void>;
    tab: () => Promise<void>;
    // Add more user events as needed
  }
  
  export interface UserEventOptions {
    skipHover?: boolean;
    delay?: number;
  }
  
  export default {
    setup: (options?: UserEventOptions) => UserEvent
  };
}

// Type definitions for @testing-library/user-event/dist/types/setup/setup
declare module '@testing-library/user-event/dist/types/setup/setup' {
  export interface UserEvent {
    click: (element: HTMLElement) => Promise<void>;
    type: (element: HTMLElement, text: string) => Promise<void>;
    keyboard: (text: string) => Promise<void>;
    tab: () => Promise<void>;
    // Add more user events as needed
  }
} 