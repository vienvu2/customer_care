import { create } from 'zustand'

interface UIState {
    sidebarOpen: boolean
    theme: 'light' | 'dark'
    notifications: Array<{
        id: string
        type: 'success' | 'error' | 'warning' | 'info'
        message: string
        timestamp: number
    }>
    modals: {
        createTicket: boolean
        editUser: boolean
        confirmDelete: boolean
    }

    // Actions
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    toggleTheme: () => void
    setTheme: (theme: 'light' | 'dark') => void
    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void
    removeNotification: (id: string) => void
    openModal: (modal: keyof UIState['modals']) => void
    closeModal: (modal: keyof UIState['modals']) => void
    closeAllModals: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
    sidebarOpen: true,
    theme: 'dark',
    notifications: [],
    modals: {
        createTicket: false,
        editUser: false,
        confirmDelete: false,
    },

    toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
    })),

    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),

    setTheme: (theme) => set({ theme }),

    addNotification: (notification) => set((state) => ({
        notifications: [
            ...state.notifications,
            {
                ...notification,
                id: Date.now().toString(),
                timestamp: Date.now(),
            }
        ]
    })),

    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
    })),

    openModal: (modal) => set((state) => ({
        modals: { ...state.modals, [modal]: true }
    })),

    closeModal: (modal) => set((state) => ({
        modals: { ...state.modals, [modal]: false }
    })),

    closeAllModals: () => set({
        modals: {
            createTicket: false,
            editUser: false,
            confirmDelete: false,
        }
    }),
}))