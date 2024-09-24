import { createDirectus, rest, authentication } from '@directus/sdk';

let directus;

export function getDirectusInstance(fetch) {
  if (directus) {
    return directus;
  }

  const options = fetch ? { globals: { fetch } } : {};
  directus = createDirectus(import.meta.env.VITE_DIRECTUS_URL ).with(authentication('json')).with(rest());
	return directus;
}



export default getDirectusInstance;