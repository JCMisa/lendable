import { db } from "@/config/db";
import { users } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id))
    .limit(1);

  return NextResponse.json(dbUser[0] || null);
}
