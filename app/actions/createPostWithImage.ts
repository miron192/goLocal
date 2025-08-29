"use server";

import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

export async function createPostWithImage(formData: FormData) {
  const user = await checkUser();
  if (!user) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;
  const cityIdFromForm = formData.get("cityId") as string;
  const cityName = formData.get("cityName") as string | null; // optional, dacă ai numele orașului

  if (!content?.trim()) throw new Error("Post content cannot be empty");
  if (!cityIdFromForm) throw new Error("City is required");

  let city = await db.city.findUnique({
    where: { googlePlaceId: cityIdFromForm },
  });

  if (!city) {
    city = await db.city.create({
      data: {
        googlePlaceId: cityIdFromForm,
        cityName: cityName ?? "",
      },
    });
  }

  let imageUrl: string | null = null;
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "posts" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploadResult.secure_url;
  }

  const post = await db.post.create({
    data: {
      authorId: user.id,
      content,
      imageUrl,
      cityId: city.googlePlaceId,
    },
  });

  return post;
}
