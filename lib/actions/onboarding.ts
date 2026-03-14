"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";

export async function completeOnboardingAction() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const client = await clerkClient();

    // Update Clerk Metadata (for fast proxy checks) as well as database onboardingCompleted property
    await Promise.all([
      client.users.updateUser(userId, {
        publicMetadata: { onboardingComplete: true },
      }),
      db
        .update(users)
        .set({ onboardingCompleted: true })
        .where(eq(users.clerkId, userId)),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Onboarding Error:", error);
    return { error: "Failed to complete onboarding" };
  }
}
