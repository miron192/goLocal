import { db } from "./db";

export const getUser = async ({ userId }: { userId: string }) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return null;
  return user;
};
