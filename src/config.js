// Central place for every external URL used by the site.
// Override any of these in Vercel (Project → Settings → Environment Variables)
// or in a local .env file. Vite only exposes variables prefixed with VITE_.
const env = import.meta.env;

export const BACK_URL =
  env.VITE_BACK_URL || 'https://www.bits-pilani.ac.in/pilani/aicoe2024';

// Datawrapper map embeds
export const MAPS = {
  wheat: env.VITE_MAP_WHEAT_URL || 'https://datawrapper.dwcdn.net/yFKAB/1/',
  rice: env.VITE_MAP_RICE_URL || 'https://datawrapper.dwcdn.net/zkBDx/1/',
  corn: env.VITE_MAP_CORN_URL || 'https://datawrapper.dwcdn.net/0qze0/1/',
  variability: env.VITE_MAP_VARIABILITY_URL || 'https://datawrapper.dwcdn.net/TumWF/1/',
};
