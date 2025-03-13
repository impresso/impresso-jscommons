import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.dev.json'
    }]
  },
  testRegex: '(test/.*|(\\.|/)(test|spec))\\.ts$',
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
};

export default config;