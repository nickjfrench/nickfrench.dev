// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), vue()],

  vite: {
    server: {
      watch: {
        ignored: ['**/.obsidian/**', '**/_bases/**', '**/bases/**', '**/_home/**', '**/home/**', '**/_base/**', '**/base/**']
      }
    },
    plugins: [tailwindcss()],
  },
});