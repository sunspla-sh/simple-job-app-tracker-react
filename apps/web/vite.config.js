import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    server: {
      port: +process.env.VITE_WEB_PORT
    },
    plugins: [react()]
  })
}
