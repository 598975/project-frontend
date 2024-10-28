import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "^/login": {
        target: "https://localhost:7067",
        secure: false
      },
      "^/register": {
        target: "https://localhost:7067",
        secure: false
      },
      "^/pingauth": {
        target: "https://localhost:7067",
        secure: false
      },
      "^/logout": {
        target: "https://localhost:7067",
        secure: false
      },
      "^/api/Polls": {
        target: "https://localhost:7067",
        secure: false
      },
      "^/api/Votes": {
        target: "https://localhost:7067",
        secure: false
      }
    }
  }
})
