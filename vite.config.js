import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    https:{
      key: './tasktrail-privateKey.key',
      cert: './tasktrail.crt',
    }
  },
  plugins: [react()],
})