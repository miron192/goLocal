"use server";

import { db } from "@/lib/db";

export async function getPostsByUser(userId: string) {
  if (!userId) {
    console.error("no userId");
    return null;
  }

  try {
    const posts = await db.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        likes: true,
        city: {
          select: {
            cityName: true,
            id: true,
          },
        },
      },
    });

    return posts;
  } catch (e) {
    console.error("error getPostsByUser:", e);
    return null;
  }
}
