import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter(),
		files: {
			// Specify that the root page
			// routes: 'src/routes/home/'
		},
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils.ts',
			$types: 'src/lib/types.ts',
			$config: 'src/lib/config.ts',
			$stores: 'src/lib/stores',
			$dummy_data: 'src/lib/dummy_data.ts',
		}
	}
};

export default config;
