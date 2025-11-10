import type { FileProps, FolderProps, SelectedProps } from 'types/index'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'vs-dark' | 'light'

interface EditorState {
  content: string
  theme: Theme
  updateContent: (newContent: string) => void
  setTheme: (theme: Theme) => void
  selected: SelectedProps
  setSelected: (selected: SelectedProps) => void

  files: FileProps[]
  folders: FolderProps[]
  addFile: (file: FileProps) => void
  addFolder: (folder: FolderProps) => void
  updateFile: (id: number, updates: Partial<FileProps>) => void
}

const useEditorStore = create<EditorState>()(
  persist(
    set => ({
      content: '',
      theme: 'vs-dark',
      updateContent: newContent => set({ content: newContent }),
      setTheme: theme => set({ theme }),
      selected: { id: null, type: null },
      setSelected: currentlyselected =>
        set({
          selected: { id: currentlyselected.id, type: currentlyselected.type },
        }),

      files: [],
      folders: [],
      addFile: file =>
        set(state => ({
          files: [...state.files, file],
        })),
      addFolder: folder =>
        set(state => ({
          folders: [...state.folders, folder],
        })),
      updateFile: (id, updates) =>
        set(state => ({
          files: state.files.map(f => (f.id === id ? { ...f, ...updates } : f)),
        })),
    }),
    {
      name: 'editor-storage',
    }
  )
)

export default useEditorStore
