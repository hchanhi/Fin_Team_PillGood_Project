import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8080',
            '/fcm': 'http://localhost:8080',
        },
    },
    // Gradle copyReactBuildFiles 태스크가 build/ 를 복사하므로 CRA와 동일하게 유지
    build: { outDir: 'build' },
});
