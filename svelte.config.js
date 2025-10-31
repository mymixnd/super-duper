import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-node for Coolify deployment
		// See https://svelte.dev/docs/kit/adapter-node
		adapter: adapter({
			// Output to 'build' directory
			out: 'build',
			// Precompress assets for better performance
			precompress: true
		}),
		// Change public env prefix to avoid adapter-node conflicts
		// Default 'PUBLIC_' causes runtime errors when those vars exist in container
		env: {
			publicPrefix: 'APP_PUBLIC_'
		}
	}
};

export default config;
