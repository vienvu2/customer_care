import { User } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = Omit<User, 'password'>

interface AuthState {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean

    // Actions
    login: (user: AuthUser, token: string) => void
    logout: () => void
    setLoading: (loading: boolean) => void
    updateUser: (user: Partial<AuthUser>) => void
    setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: (user, token) => {
                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('auth-token', token)
                }
                
                set({ 
                    user, 
                    token,
                    isAuthenticated: true 
                })
            },

            logout: () => {
                // Remove token from localStorage
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-token')
                }
                
                set({ 
                    user: null, 
                    token: null,
                    isAuthenticated: false 
                })
            },

            setLoading: (loading) => set({ isLoading: loading }),

            updateUser: (userData) => {
                const currentUser = get().user
                if (currentUser) {
                    set({ user: { ...currentUser, ...userData } })
                }
            },

            setToken: (token) => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('auth-token', token)
                }
                set({ token })
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                user: state.user, 
                token: state.token,
                isAuthenticated: state.isAuthenticated 
            }),
        }
    )
)