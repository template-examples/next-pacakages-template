export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react',
        },
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
}
