import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/AdminBar";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/admin/auth";
import { NEW_POST } from "@/lib/blog/post";
import { readAllPosts, storageInfo } from "@/lib/blog/store";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireAdmin();
  const posts = await readAllPosts();
  return (
    <>
      <AdminBar />
      <PostEditor
        initial={NEW_POST}
        meta={{ previousSlugs: [], updatedAt: null }}
        linkTargets={posts.map((p) => ({ title: p.title, slug: p.slug }))}
        canSave={storageInfo().durable}
      />
    </>
  );
}
