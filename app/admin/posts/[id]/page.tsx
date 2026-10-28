import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminBar } from "@/components/admin/AdminBar";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/admin/auth";
import { toEditable } from "@/lib/blog/post";
import { readAllPosts, storageInfo } from "@/lib/blog/store";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const posts = await readAllPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) notFound();
  return (
    <>
      <AdminBar />
      <PostEditor
        initial={toEditable(post)}
        meta={{ previousSlugs: post.previousSlugs, updatedAt: post.updatedAt }}
        linkTargets={posts.filter((p) => p.id !== id).map((p) => ({ title: p.title, slug: p.slug }))}
        canSave={storageInfo().durable}
      />
    </>
  );
}
