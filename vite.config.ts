import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ['phosphor-svelte, ']
  },
  ssr: {
    noExternal: ['tsparticles', '@tsparticles/slim', '@tsparticles/engine', '@tsparticles/svelte'] // add all tsparticles libraries here, they're not made for SSR, they're client only
  }
});
