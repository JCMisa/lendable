"use server";

import { auth } from "@clerk/nextjs/server";
import { users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { cacheLife, cacheTag } from "next/cache";

// This function is now purely for data fetching
// We pass userId as an argument so the cache is keyed to that specific user
export const getCachedUser = async (userId: string) => {
  "use cache";
  cacheTag(`user-${userId}`); // Unique tag for this specific user
  cacheLife("hours");

  try {
    const [data] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId));

    return data || null;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};

// This is the wrapper you call in your components
export const getCurrentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, data: null };
  }

  const data = await getCachedUser(userId);

  return {
    success: !!data,
    data: data,
  };
};
