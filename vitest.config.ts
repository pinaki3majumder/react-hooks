import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './vitest.setup.ts',
        exclude: [...configDefaults.exclude, '**/e2e/**'], // Example: Exclude e2e tests
        coverage: {
            provider: 'v8', // Use Vite's default coverage provider
            reporter: ['text', 'json', 'html'],
            all: true,
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['**/*.d.ts', 'src/main.tsx', 'src/**/__mocks__/**'],
            thresholds: {
                statements: 90,
                branches: 90,
                functions: 90,
                lines: 90,
            }
        }
    },
})