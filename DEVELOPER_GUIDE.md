# Developer Guide

This guide provides information about the development tools, testing setup, and code quality standards for the Sólida project.

## Development Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

## Testing

### Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (recommended during development):

```bash
npm run test:watch
```

To run tests with coverage:

```bash
npm run test:coverage
```

### Writing Tests

Tests are located in the `app/__tests__` directory and follow this structure:

- `app/__tests__/components/`: Tests for React components
- `app/__tests__/hooks/`: Tests for custom hooks
- `app/__tests__/utils/`: Tests for utility functions

#### Example Test Structure

```tsx
import { render, screen } from '@/app/__tests__/test-utils';
import { MyComponent } from '@/app/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });
  
  // More tests...
});
```

### Test Utilities

The custom test utilities are available in `app/__tests__/test-utils.tsx` and provide:

- Custom render function with providers
- User event setup
- Helper functions

## Code Quality Tools

### ESLint

ESLint is configured to enforce code quality and consistency.

To run ESLint:

```bash
npm run lint
```

To fix automatically fixable issues:

```bash
npm run lint -- --fix
```

### Prettier

Prettier is used for consistent code formatting.

To format code:

```bash
npm run format
```

To check if code is formatted correctly:

```bash
npm run format:check
```

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically run linters and formatters on staged files before commits.

Pre-push hooks will run tests and type checking before pushing to remote.

## TypeScript Best Practices

### Type Definitions

All components should have proper type definitions:

```tsx
// Component props interface
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

// Type annotation for component
export const Button: FC<ButtonProps> = ({ variant, children, onClick }) => {
  // Component implementation
};
```

### JSDoc Comments

Add JSDoc comments to all components and functions:

```tsx
/**
 * Button component with different variants.
 * 
 * @param variant - The visual style of the button
 * @param children - The content of the button
 * @param onClick - Optional click handler
 * @returns A styled button component
 */
export const Button: FC<ButtonProps> = ({ variant, children, onClick }) => {
  // Component implementation
};
```

## Component Structure

### Component Organization

Components are organized by feature/domain:

```
app/
  components/
    layout/     # Layout components like Header, Footer
    ui/         # UI components like Button, Card
    [feature]/  # Feature-specific components
```

### Custom Hooks

Complex logic should be extracted into custom hooks:

```tsx
// Bad
const Component = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Complex logic
  }, []);
  
  // More component code
};

// Good
const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Complex logic extracted to hook
  }, []);
  
  return { isOpen, setIsOpen };
};

const Component = () => {
  const { isOpen, setIsOpen } = useMenu();
  // More component code
};
```

## Accessibility

### ARIA Attributes

Include ARIA attributes for better accessibility:

```tsx
<button
  aria-label="Close menu"
  aria-expanded={isOpen}
  aria-controls="menu-content"
  onClick={closeMenu}
>
  <CloseIcon />
</button>
```

### Keyboard Navigation

Ensure components are keyboard accessible:

```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    onClick?.();
  }
};

return (
  <div 
    role="button" 
    tabIndex={0} 
    onClick={onClick} 
    onKeyDown={handleKeyDown}
  >
    {children}
  </div>
);
``` 