import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  
  // An array of regexp pattern strings that are matched against all test paths before executing the test
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    // Add additional module mappers as needed
    '^@testing-library/react$': '<rootDir>/node_modules/@testing-library/react',
    '^@testing-library/jest-dom$': '<rootDir>/node_modules/@testing-library/jest-dom',
    '^@testing-library/user-event$': '<rootDir>/node_modules/@testing-library/user-event',
  },
  
  // Customize how node_modules are transformed
  transformIgnorePatterns: [
    '/node_modules/(?!((lucide-react|react-icons)/))'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/_*.{ts,tsx}',
    '!app/**/types/*.{ts,tsx}',
    '!app/**/api/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Transform files with our custom transformer
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config); 