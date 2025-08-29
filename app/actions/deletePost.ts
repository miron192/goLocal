"use server";

import { db } from "@/lib/db";

export async function deletePost(userId: string, postId: string) {
  if (!postId) {
    throw new Error("Post ID is required");
  }

  const post = await db.post.findUnique({ where: { id: postId } });

  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Not authorized");

  await db.post.delete({ where: { id: postId } });
  return { success: true };
}
