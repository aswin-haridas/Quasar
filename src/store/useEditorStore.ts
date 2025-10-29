import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'vs-dark' | 'light'

interface EditorState {
  content: string
  theme: Theme
  updateContent: (newContent: string) => void
  setTheme: (theme: Theme) => void
}

const useEditorStore = create<EditorState>()(
  persist(
    set => ({
      content: '',
      theme: 'vs-dark',
      updateContent: newContent => set({ content: newContent }),
      setTheme: theme => set({ theme }),
    }),
    {
      name: 'editor-storage',
    }
  )
)

export default useEditorStore
