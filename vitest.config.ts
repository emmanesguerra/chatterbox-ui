import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()], // Add this line
    test: {
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Ensure @ maps to src
        },
    },
});
