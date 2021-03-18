module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
  },
}
