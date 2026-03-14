import { create } from "zustand";
import { User } from "@/config/schema";

interface UserState {
  userDetails: User | null;
  isLoading: boolean;
  setUserDetails: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userDetails: null,
  isLoading: true,
  setUserDetails: (user) => set({ userDetails: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
