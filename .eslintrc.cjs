module.exports = {
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:cypress/recommended',
    '@vue/eslint-config-typescript',
  ],
  overrides: [
    {
      files: [
        './index.html',
        './src/**/*.{js,vue}',
      ],
      plugins: ['tailwindcss'],
      extends: ['plugin:tailwindcss/recommended'],
      rules: {
        'tailwindcss/no-custom-classname': 'off',
        'vue/multi-word-component-names': ['error', {
          "ignores": ['index']
        }]
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
    },
    {
      files: [
        'tests/unit/**',
      ],
      plugins: [
        'vitest',
      ],
      extends: [
        'plugin:vitest/recommended',
      ],
      globals: {
        ...require('eslint-plugin-vitest').environments.env.globals,
      },
    },
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never',
    }],
    'vue/object-curly-spacing': ['error', 'always'],
    'semi': [2, "always"],
  },
  env: {
    "browser": true,
    "amd": true,
    "node": true
  },
}
