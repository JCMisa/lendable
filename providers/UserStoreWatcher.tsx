"use client";

import { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/userStore";

export const UserStoreWatcher = () => {
  const { user, isLoaded } = useUser();
  const { setUserDetails, setIsLoading } = useUserStore();

  useEffect(() => {
    if (!isLoaded) return;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get("/api/users/me");
        setUserDetails(result.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUser();
    } else {
      setIsLoading(false);
      setUserDetails(null);
    }
  }, [user, isLoaded, setUserDetails, setIsLoading]);

  return null; // This component renders nothing, it just manages data
};
