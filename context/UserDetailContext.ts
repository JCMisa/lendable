import { User } from "@/config/schema";
import { createContext } from "react";

export interface UserDetailContextType {
  userDetails: User | null;
  setUserDetails: (user: User | null) => void;
}

export const UserDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);
