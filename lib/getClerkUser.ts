import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUser(clerkUserId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(clerkUserId);

  return {
    id: user.id,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
  };
}
