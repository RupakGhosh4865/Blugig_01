/**
 * Tell IndexNow engines (Bing, Yandex, Seznam…; not Google) that the site's pages changed.
 * Run after a deploy is live: `npm run indexnow`. Reads the live sitemap, so it submits
 * exactly the URLs search engines see. The key file is public/<KEY>.txt, served on www;
 * the same key is in lib/indexnow.ts, which pings for each blog post as it's published.
 */
const SITE = "https://www.avantratechnologies.com";
const KEY = "266ad790aefc0f0477960e0ac1ed1c94";

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned ${r.status}`);
  return r.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) throw new Error("No <loc> entries in sitemap.xml");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
// 200 = accepted, 202 = accepted while the key is being verified.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 300) process.exitCode = 1;
