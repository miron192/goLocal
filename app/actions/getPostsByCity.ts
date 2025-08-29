"use server";

import { db } from "@/lib/db";
import { checkCity } from "@/lib/checkCity";

export async function getPostsByCity(
  placeId: string,
  page = 1,
  limit = 10,
  cityName: string
) {
  if (!placeId) {
    console.error("Nu ai trimis placeId");
    return null;
  }

  try {
    const city = await checkCity({
      cityId: placeId,
    });

    const posts = await db.post.findMany({
      where: { cityId: city.googlePlaceId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: true,
        likes: true,
      },
    });

    return posts;
  } catch (e) {
    console.error("Eroare la getPostsByCity:", e);
    return null;
  }
}
