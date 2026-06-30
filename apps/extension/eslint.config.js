import baseConfig from '@cloakify/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['dist', 'node_modules', 'playwright-report', 'test-results'],
  },
];
