import { User } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean

    // Actions
    login: (user: User) => void
    logout: () => void
    setLoading: (loading: boolean) => void
    updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: (user) => set({ user, isAuthenticated: true }),

            logout: () => set({ user: null, isAuthenticated: false }),

            setLoading: (loading) => set({ isLoading: loading }),

            updateUser: (userData) => {
                const currentUser = get().user
                if (currentUser) {
                    set({ user: { ...currentUser, ...userData } })
                }
            },
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
)