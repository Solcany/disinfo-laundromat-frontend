import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { phosphorSvelteOptimize } from 'phosphor-svelte/preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess({}), phosphorSvelteOptimize()],

  kit: {
    adapter: adapter(),
    files: {
      // Specify the root page if you want to adjust the home page
      // routes: 'src/routes/home/'
    },
    alias: {
      $components: 'src/lib/components',
      $api: 'src/lib/api.ts',
      $utils: 'src/lib/utils.ts',
      $models: 'src/lib/models.ts',
      $config: 'src/lib/config.ts',
      $stores: 'src/lib/stores',
      $dummy_data: 'src/lib/dummy_data.ts'
    }
  }
};

export default config;
