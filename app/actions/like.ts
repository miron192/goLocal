"use server";

import { togglePostLike } from "@/lib/like";
import { getUserByClerkId } from "./getUserByClerkId";

export async function handleLike(postId: string) {
  const user = await getUserByClerkId();
  console.log(user);

  if (!user) throw new Error("Not authenticated");

  await togglePostLike(user.id, postId);
}
