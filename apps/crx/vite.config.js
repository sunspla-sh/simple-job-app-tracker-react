import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    server: {
      port: +process.env.VITE_CRX_PORT
    },
    plugins: [
      react(),
      crx({ manifest })
    ]
  });
}
