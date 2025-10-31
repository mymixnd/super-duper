# SvelteKit + Supabase Template

**Mixnd template for rapid app development** with SvelteKit 2 + Svelte 5 + Supabase.

Auto-configured for deployment to Coolify via mixnd CLI.

---

## What's Included

- ✅ **SvelteKit 2.47+** with **Svelte 5.42+**
- ✅ **Supabase** client pre-configured
- ✅ **Tailwind CSS 4** (Vite plugin)
- ✅ **TypeScript** for type safety
- ✅ **Vitest** for unit + browser testing
- ✅ **Playwright** for E2E testing
- ✅ **ESLint + Prettier** for code quality
- ✅ **Dockerfile** for Coolify deployment (adapter-node)
- ✅ **Environment variables** auto-injected from Doppler

---

## Quick Start with Mixnd CLI

### Create New App

```bash
mixnd app new my-blog --template template-sveltekit-supabase
```

This automatically:
1. ✅ Creates GitHub repo from this template
2. ✅ Creates Supabase project with API keys
3. ✅ Creates Doppler project for secrets
4. ✅ Creates Coolify application
5. ✅ Configures environment variables
6. ✅ Sets up webhook deployment

### Clone and Develop

```bash
# Clone your new repo
git clone https://github.com/mymixnd/my-blog
cd my-blog

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Visit http://localhost:5173 - you should see the Supabase connection status!

### Deploy

```bash
# Commit your changes
git add .
git commit -m "My first feature"

# Push to deploy
git push
```

Coolify webhook will automatically:
1. Pull latest code
2. Build Docker image
3. Deploy to production
4. Update domain (e.g., https://my-blog.mixnd.com)

---

## Manual Setup (without mixnd CLI)

If you're not using mixnd CLI:

### 1. Clone Template

```bash
git clone https://github.com/mymixnd/template-sveltekit-supabase my-app
cd my-app
pnpm install
```

### 2. Set Up Environment Variables

Create `.env` file:

```bash
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### 3. Run Development Server

```bash
pnpm dev
```

---

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:5173)
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Unit tests only (Vitest)
pnpm test:e2e         # E2E tests only (Playwright)

# Code Quality
pnpm check            # Type check
pnpm lint             # Run ESLint + Prettier
pnpm format           # Format with Prettier
```

---

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── server/              # Server-only code
│   │   └── components/          # Shared components
│   ├── routes/
│   │   └── +page.svelte         # Homepage with Supabase demo
│   └── app.html
├── static/                       # Static assets
├── tests/                        # Unit tests
├── e2e/                          # E2E tests
├── Dockerfile                    # For Coolify deployment
├── .mixnd.toml.template          # Mixnd config template
└── svelte.config.js              # SvelteKit config (adapter-node)
```

---

## Environment Variables

Managed automatically by mixnd CLI via Doppler:

### Public (exposed to browser)
- `PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Private (server-side only)
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `NODE_ENV` - Environment (development/production)

---

## Supabase Integration

The Supabase client is pre-configured in `src/lib/supabase.ts`.

### Client Usage

```typescript
import { supabase } from '$lib/supabase';

// Example: Fetch data
const { data, error } = await supabase
  .from('todos')
  .select('*');
```

### Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await supabase.auth.signOut();
```

See [Supabase Auth docs](https://supabase.com/docs/guides/auth) for more.

---

## Testing

### Unit Tests (Vitest)

Test files: `*.spec.ts` (server-side) and `*.svelte.spec.ts` (browser)

```bash
pnpm test:unit
```

### E2E Tests (Playwright)

Test files in `e2e/*.test.ts`

```bash
pnpm test:e2e
```

**Playwright setup on WSL2:**
```bash
pnpm exec playwright install chromium
sudo pnpm exec playwright install-deps
```

---

## Deployment

### Via Coolify (Recommended)

Push to `main` branch:

```bash
git push origin main
```

Coolify webhook triggers automatically - no manual steps needed!

### Manual Docker Build

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 \
  -e PUBLIC_SUPABASE_URL=https://xyz.supabase.co \
  -e PUBLIC_SUPABASE_ANON_KEY=your-key \
  my-app
```

---

## Customization

### Add New Routes

Create `src/routes/about/+page.svelte`:

```svelte
<h1>About Page</h1>
<p>This is the about page.</p>
```

Routes are automatically available at `/about`.

### Add Database Tables

1. Open your Supabase dashboard
2. Go to Table Editor
3. Create tables (e.g., `todos`, `posts`)
4. Use in your app:

```typescript
// Create
const { data, error } = await supabase
  .from('todos')
  .insert({ title: 'My task', done: false });

// Read
const { data } = await supabase.from('todos').select('*');

// Update
await supabase.from('todos').update({ done: true }).eq('id', 1);

// Delete
await supabase.from('todos').delete().eq('id', 1);
```

### Add Pages with Server-Side Data

Create `src/routes/blog/+page.server.ts`:

```typescript
import { supabase } from '$lib/supabase';

export async function load() {
  const { data: posts } = await supabase.from('posts').select('*');
  return { posts };
}
```

Then use in `src/routes/blog/+page.svelte`:

```svelte
<script lang="ts">
  export let data;
</script>

{#each data.posts as post}
  <h2>{post.title}</h2>
  <p>{post.content}</p>
{/each}
```

---

## WSL2 Notes

File watching uses polling on WSL2 (already configured in `vite.config.ts`).

If hot reload isn't working, verify the polling config is enabled.

---

## Template Maintenance

This is a template repository. To sync latest updates:

```bash
# Add template as remote
git remote add template https://github.com/mymixnd/template-sveltekit-supabase
git fetch template

# Merge updates
git merge template/main --allow-unrelated-histories
```

---

## Learn More

- **SvelteKit:** https://svelte.dev/docs/kit
- **Svelte 5:** https://svelte.dev/docs/svelte
- **Supabase:** https://supabase.com/docs
- **Coolify:** https://coolify.io/docs
- **Mixnd CLI:** https://github.com/mymixnd/mixnd-cli

---

## Support

- **Issues:** https://github.com/mymixnd/mixnd-cli/issues
- **Discussions:** https://github.com/mymixnd/mixnd-cli/discussions

---

## License

MIT