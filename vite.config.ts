import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        watch: {
            // https://rollupjs.org/guide/en/#watch-options
        },
        base: "./"

    }
})
