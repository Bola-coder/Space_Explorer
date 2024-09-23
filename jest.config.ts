import type { Config } from "jest";

const config: Config = {
  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom", // Needed for React and DOM testing

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/"],

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // Automatically reset mock state before every test
  resetMocks: true,

  // Automatically restore mock state and implementation before every test
  restoreMocks: true,

  // A list of paths to modules that run some code to configure or set up the testing environment before each test
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional, if you need custom Jest setup

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
  },

  // Module name mapper for handling CSS and static files in tests
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock static file imports
  },
};

export default config;
