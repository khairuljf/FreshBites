// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Old product URLs that were renamed — keeps shared links working.
  redirects: {
    '/products/talbina': '/products/jober-chatu',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});