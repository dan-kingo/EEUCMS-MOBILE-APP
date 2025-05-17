// store/userStore.ts
import { create } from "zustand";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updatedFields: Partial<User>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updatedFields) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedFields } : null,
    })),
}));

export default useUserStore;
