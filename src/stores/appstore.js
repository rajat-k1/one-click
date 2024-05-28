import { create } from 'zustand'

const useAppStore = create((set) => ({
  darkMode: false,
  setMode: (mode) => set({ darkMode: mode }),
  mediaUrl: '',
  setmediaUrl: (url) => set({ mediaUrl:  url }),
  connections: {
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  },
  setConnections: (conn) => set({connections: conn})
}))

export default useAppStore