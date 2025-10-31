import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// Create Supabase client
// Environment variables are injected by Coolify from Doppler
// Using APP_PUBLIC_ prefix to avoid adapter-node conflicts
export const supabase = createClient(
	env.APP_PUBLIC_SUPABASE_URL || '',
	env.APP_PUBLIC_SUPABASE_ANON_KEY || ''
);