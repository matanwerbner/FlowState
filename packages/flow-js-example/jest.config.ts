/* eslint-disable */
export default {
  displayName: 'flow-js-example',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/flow-js-example',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
