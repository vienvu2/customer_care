import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
    sidebarOpen: boolean
    theme: 'light' | 'dark'

    leftWidth?: number
    rightWidth?: number
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
    setLeftWidth: (width: number) => void
    setRightWidth: (width: number) => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            sidebarOpen: true,
            theme: 'dark',
            notifications: [],
            modals: {
                createTicket: false,
                editUser: false,
                confirmDelete: false,
            },
            leftWidth: 250, // Default width for left sidebar
            rightWidth: 250, // Default width for right sidebar

            toggleSidebar: () => set((state) => ({
                sidebarOpen: !state.sidebarOpen
            })),

            setLeftWidth: (width) => set({ leftWidth: width }),
            setRightWidth: (width) => set({ rightWidth: width }),

            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light'
                set({ theme: newTheme })
            },

            setTheme: (theme) => {
                set({ theme })
            },


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
        }), {
        name: 'ui-storage', // Unique name for the storage
    })
)