import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://practicaltools.org',
  output: 'static',
  build: {
    format: 'directory',
  },
});
