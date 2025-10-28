import { create } from "zustand"
import { persist } from "zustand/middleware"

interface EditorState {
  content: string
  updateContent: (newContent: string) => void
}

const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      content: "",
      updateContent: (newContent) => set({ content: newContent }),
    }),
    {
      name: "editor-storage", 
    }
  )
)

export default useEditorStore