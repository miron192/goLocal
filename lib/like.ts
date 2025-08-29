import { db } from "@/lib/db";

export async function togglePostLike(userId: string, postId: string) {
  // Check user exists

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found, cannot like post");
  }

  // Check if like already exists
  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
    return { liked: false };
  } else {
    const newLike = await db.like.create({
      data: {
        userId,
        postId,
      },
    });
    return { liked: true, like: newLike };
  }
}
