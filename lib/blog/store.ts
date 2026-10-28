import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";
import { seedPosts } from "@/content/blogSeed";
import { DEFAULT_AUTHOR, type Post } from "@/lib/blog/post";

/**
 * Where blog posts live. Server only.
 * - DATABASE_URL set (Railway Postgres): a `blog_posts` table, one JSONB row per post.
 * - Otherwise JSON files, one per post, in BLOG_DATA_DIR or ./.data/blog.
 * A brand-new store starts with the posts in content/blogSeed.ts.
 * Files without BLOG_DATA_DIR are fine for local development, but on Railway
 * the container disk is wiped on every deploy, so the admin refuses to save there.
 */

export type StorageInfo = { kind: "postgres" | "files"; durable: boolean; label: string };

export function storageInfo(): StorageInfo {
  if (process.env.DATABASE_URL) return { kind: "postgres", durable: true, label: "Postgres database" };
  if (process.env.BLOG_DATA_DIR) return { kind: "files", durable: true, label: `Files in ${process.env.BLOG_DATA_DIR}` };
  return { kind: "files", durable: process.env.NODE_ENV !== "production", label: "Files in .data/blog" };
}

/** Fill fields a stored post may predate, so older rows keep working as the model grows. */
function normalize(raw: Partial<Post> & Pick<Post, "id" | "slug">): Post {
  return {
    previousSlugs: [],
    status: "draft",
    title: "",
    seoTitle: "",
    description: "",
    excerpt: "",
    focusKeyword: "",
    tags: [],
    content: "",
    faqs: [],
    noindex: false,
    canonicalUrl: "",
    publishedAt: null,
    createdAt: raw.updatedAt ?? new Date(0).toISOString(),
    updatedAt: raw.createdAt ?? new Date(0).toISOString(),
    ...raw,
    author: { ...DEFAULT_AUTHOR, ...raw.author },
  };
}

// ---- Postgres -------------------------------------------------------------

type Sql = postgres.Sql;
/** One client per server process (kept on globalThis so dev reloads don't open new pools). */
const g = globalThis as unknown as { __blogSql?: Sql; __blogReady?: Promise<void> };

async function pg(): Promise<Sql> {
  g.__blogSql ??= postgres(process.env.DATABASE_URL!, { max: 5, idle_timeout: 30, onnotice: () => {} });
  g.__blogReady ??= initPg(g.__blogSql).catch((err) => {
    g.__blogReady = undefined;
    throw err;
  });
  await g.__blogReady;
  return g.__blogSql;
}

async function initPg(sql: Sql) {
  const [{ fresh }] = await sql<{ fresh: boolean }[]>`select to_regclass('public.blog_posts') is null as fresh`;
  await sql`
    create table if not exists blog_posts (
      id text primary key,
      slug text not null unique,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )`;
  if (fresh) {
    for (const p of seedPosts) {
      await sql`insert into blog_posts (id, slug, data) values (${p.id}, ${p.slug}, ${sql.json(toJson(p))}) on conflict do nothing`;
    }
  }
}

const toJson = (post: Post) => post as unknown as postgres.JSONValue;

// ---- Files ----------------------------------------------------------------

const ID_RE = /^[a-z0-9-]{1,80}$/;

function filesDir() {
  return process.env.BLOG_DATA_DIR || path.join(process.cwd(), ".data", "blog");
}

async function writeJsonFile(dir: string, post: Post) {
  const file = path.join(dir, `${post.id}.json`);
  await writeFile(`${file}.tmp`, JSON.stringify(post, null, 2));
  await rename(`${file}.tmp`, file);
}

/** The directory, created and seeded the first time (a marker file records that, so deleting every post doesn't re-seed). */
async function files(): Promise<string> {
  const dir = filesDir();
  const marker = path.join(dir, ".initialized");
  if (!existsSync(marker)) {
    await mkdir(dir, { recursive: true });
    await Promise.all(seedPosts.map((p) => writeJsonFile(dir, p)));
    await writeFile(marker, new Date().toISOString());
  }
  return dir;
}

// ---- API ------------------------------------------------------------------

export async function readAllPosts(): Promise<Post[]> {
  if (process.env.DATABASE_URL) {
    const sql = await pg();
    const rows = await sql<{ data: Post }[]>`select data from blog_posts`;
    return rows.map((r) => normalize(r.data));
  }
  const dir = await files();
  // Runtime data, not source: the turbopackIgnore hints keep the bundler from tracing the whole project.
  const names = (await readdir(/*turbopackIgnore: true*/ dir)).filter((n) => n.endsWith(".json"));
  return Promise.all(
    names.map(async (n) => normalize(JSON.parse(await readFile(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ dir, n), "utf8")))),
  );
}

export async function readPost(id: string): Promise<Post | null> {
  if (!ID_RE.test(id)) return null;
  if (process.env.DATABASE_URL) {
    const sql = await pg();
    const [row] = await sql<{ data: Post }[]>`select data from blog_posts where id = ${id}`;
    return row ? normalize(row.data) : null;
  }
  const file = path.join(await files(), `${id}.json`);
  return existsSync(file) ? normalize(JSON.parse(await readFile(file, "utf8"))) : null;
}

export async function writePost(post: Post): Promise<void> {
  if (!ID_RE.test(post.id)) throw new Error(`Invalid post id: ${post.id}`);
  if (process.env.DATABASE_URL) {
    const sql = await pg();
    await sql`
      insert into blog_posts (id, slug, data, updated_at) values (${post.id}, ${post.slug}, ${sql.json(toJson(post))}, now())
      on conflict (id) do update set slug = excluded.slug, data = excluded.data, updated_at = now()`;
    return;
  }
  await writeJsonFile(await files(), post);
}

export async function removePost(id: string): Promise<void> {
  if (!ID_RE.test(id)) return;
  if (process.env.DATABASE_URL) {
    const sql = await pg();
    await sql`delete from blog_posts where id = ${id}`;
    return;
  }
  const file = path.join(await files(), `${id}.json`);
  if (existsSync(file)) await unlink(file);
}
