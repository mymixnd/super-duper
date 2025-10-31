<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { env } from '$env/dynamic/public';

	const supabaseUrl = env.APP_PUBLIC_SUPABASE_URL || '';
	// Extract project ref from API URL (format: https://<ref>.supabase.co)
	const projectRef = supabaseUrl.split('.')[0].replace('https://', '');
	const dashboardUrl = `https://supabase.com/dashboard/project/${projectRef}`;

	let connectionStatus = 'Testing connection...';
	let isConnected = false;

	onMount(async () => {
		try {
			// Test Supabase connection by querying system tables
			const { error } = await supabase.from('_realtime').select('*').limit(1);

			// PGRST204/PGRST205 = table doesn't exist (expected for new project)
			// This is actually a successful connection test
			if (error && (error.code === 'PGRST204' || error.code === 'PGRST205')) {
				connectionStatus = '✅ Connected to Supabase!';
				isConnected = true;
			} else if (!error) {
				connectionStatus = '✅ Connected to Supabase!';
				isConnected = true;
			} else {
				throw error;
			}
		} catch (err: any) {
			connectionStatus = '❌ Supabase connection failed';
			isConnected = false;
			console.error('Supabase connection error:', err);
		}
	});
</script>

<div class="container">
	<main>
		<h1 class="text-4xl font-bold mb-4">Welcome to Your Mixnd App! 🎉</h1>

		<div class="status-card">
			<h2 class="text-2xl font-semibold mb-2">Connection Status</h2>
			<p class="status-text" class:connected={isConnected} class:disconnected={!isConnected}>
				{connectionStatus}
			</p>
			<p class="text-sm text-gray-600 mt-2">Supabase URL: {supabaseUrl}</p>
		</div>

		<div class="next-steps">
			<h2 class="text-2xl font-semibold mb-4">Next Steps</h2>
			<ul class="list-disc list-inside space-y-2">
				<li>Create tables in your <a href="{dashboardUrl}" target="_blank" class="text-blue-600 hover:underline">Supabase dashboard</a></li>
				<li>Add authentication in <code>src/lib/auth.ts</code></li>
				<li>Build your app in <code>src/routes/</code></li>
				<li>Deploy with <code class="bg-gray-100 px-2 py-1 rounded">git push</code></li>
			</ul>
		</div>

		<div class="docs-section">
			<h2 class="text-2xl font-semibold mb-4">Documentation</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<a href="https://svelte.dev/docs/kit" class="doc-card">
					<h3 class="font-semibold">SvelteKit</h3>
					<p class="text-sm text-gray-600">Framework documentation</p>
				</a>
				<a href="https://supabase.com/docs" class="doc-card">
					<h3 class="font-semibold">Supabase</h3>
					<p class="text-sm text-gray-600">Database & auth docs</p>
				</a>
				<a href="https://coolify.io/docs" class="doc-card">
					<h3 class="font-semibold">Coolify</h3>
					<p class="text-sm text-gray-600">Deployment platform docs</p>
				</a>
			</div>
		</div>
	</main>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
	}

	.status-card {
		background: #f5f5f5;
		padding: 1.5rem;
		border-radius: 8px;
		margin: 2rem 0;
	}

	.status-text {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.status-text.connected {
		color: #22c55e;
	}

	.status-text.disconnected {
		color: #ef4444;
	}

	.next-steps {
		margin: 2rem 0;
	}

	.docs-section {
		margin: 2rem 0;
	}

	.doc-card {
		display: block;
		padding: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s;
	}

	.doc-card:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	code {
		background: #e5e7eb;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
	}

	ul {
		line-height: 1.8;
	}
</style>