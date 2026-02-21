import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                Date: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier,
        },
        rules: {
            ...tsPlugin.configs['recommended'].rules,
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
        },
    },
    {
        files: ['*.js', '*.cjs'],
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'readonly',
            },
        },
    },
    eslintConfigPrettier,
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
];
