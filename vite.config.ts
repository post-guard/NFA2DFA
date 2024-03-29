import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron([
            {
                entry: 'electron/main.ts'
            },
            {
                entry: 'electron/preload.ts',
                onstart(options) {
                    options.reload();
                }
            },
            {
                entry: 'electron/Graphviz.ts',
                onstart(options) {
                    options.reload();
                }
            }
        ])
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

})
