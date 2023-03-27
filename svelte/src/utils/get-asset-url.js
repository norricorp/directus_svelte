export function getAssetURL(id) {
  if (!id) return null;
  console.log("the asset id is ", id);
  return `${import.meta.env.VITE_DIRECTUS_URL}/assets/${id}`;
}
