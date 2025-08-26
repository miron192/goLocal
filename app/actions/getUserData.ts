import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function getUserData(userId: string) {
  if (!userId) return null;

  const dbUser = await db.user.findUnique({ where: { id: userId } });
  if (!dbUser) return null;

  const client = await clerkClient();

  const clerkUser = await client.users.getUser(dbUser.clerkUserId);

  return {
    id: dbUser.id,
    clerkUserId: dbUser.clerkUserId,
    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
    email: clerkUser.emailAddresses[0]?.emailAddress,
    imageUrl: clerkUser.imageUrl,
    bio: dbUser.bio || null,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
  };
}
