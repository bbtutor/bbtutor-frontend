import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import UserInterface from "@/lib/userInterface";

interface UserState {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
