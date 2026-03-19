"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

const UserButtonClient = () => {
  return (
    <div className="flex-none">
      {/* Keeps the width stable */}
      <ClerkLoading>
        {/* Added animate-pulse for a better feel */}
        <div className="size-9 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 animate-pulse" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "size-9", // Matches your skeleton size exactly
            },
          }}
        />
      </ClerkLoaded>
    </div>
  );
};

export default UserButtonClient;
