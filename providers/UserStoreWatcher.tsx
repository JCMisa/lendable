"use client";

import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/userStore";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const UserStoreWatcher = () => {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { setUserDetails, setIsLoading } = useUserStore();

  // SWR handles the caching and revalidation logic
  const { data, isLoading: swrLoading } = useSWR(
    user ? "/api/users" : null,
    fetcher,
    {
      revalidateOnFocus: false, // STOP fetching when switching tabs
      revalidateIfStale: false, // Use cached data if available
      dedupingInterval: 60000, // Treat data as "fresh" for 1 minute
    },
  );

  useEffect(() => {
    // Sync SWR data to your Zustand store
    if (data) {
      setUserDetails(data);
    }

    // Sync loading state
    // We are "loading" if Clerk isn't ready OR if SWR is fetching
    setIsLoading(!clerkLoaded || swrLoading);

    if (clerkLoaded && !user) {
      setUserDetails(null);
      setIsLoading(false);
    }
  }, [data, swrLoading, clerkLoaded, user, setUserDetails, setIsLoading]);

  return null;
};
