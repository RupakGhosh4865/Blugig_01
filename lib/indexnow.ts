import { PRODUCTION_URL, site } from "@/content/site";

/** Key file served at /<KEY>.txt (public/), the same key scripts/indexnow.mjs uses. */
export const INDEXNOW_KEY = "266ad790aefc0f0477960e0ac1ed1c94";

/**
 * Tell IndexNow engines (Bing and partners; Google doesn't use it) that URLs changed.
 * Only from the production site, since the key file has to be live on that host.
 * Failures are logged, never thrown: a ping is a hint, not part of saving.
 */
export async function pingIndexNow(paths: string[]) {
  if (process.env.NODE_ENV !== "production" || site.url !== PRODUCTION_URL || paths.length === 0) return;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(PRODUCTION_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${PRODUCTION_URL}/${INDEXNOW_KEY}.txt`,
        urlList: paths.map((p) => new URL(p, PRODUCTION_URL).toString()),
      }),
    });
    if (res.status >= 300) console.warn("[indexnow] ping rejected", res.status, (await res.text()).slice(0, 300));
  } catch (err) {
    console.warn("[indexnow] ping failed", err);
  }
}
