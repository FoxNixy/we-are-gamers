import { create } from "zustand";

interface User {
  email: string
  fullName: string
}

interface AuthStore {
  user: User | null
  getUser: () => void
  setUser: (userData: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  getUser: () => {
    const localUser = sessionStorage.getItem('local_user')

    if (!localUser) {
      return set({ user: null })
    }

    set({ user: JSON.parse(localUser) })
  },
  setUser: (userData) => set({ user: userData })
}))