import type { Node, SelectedProps } from 'types/index'
import { create } from 'zustand'

export type Theme = 'vs-dark' | 'light'

interface EditorState {
  content: string
  theme: Theme
  nodes: Node[]
  updateContent: (newContent: string) => void
  updateNodes: (newNodes: Node[]) => void
  setTheme: (theme: Theme) => void
  selected: SelectedProps
  setSelected: (selected: SelectedProps) => void
}

const useEditorStore = create<EditorState>()(set => ({
  content: '',
  theme: 'vs-dark',
  nodes: [],
  updateNodes: newNodes => set({ nodes: newNodes }),
  updateContent: newContent => set({ content: newContent }),
  setTheme: theme => set({ theme }),
  selected: { id: null, type: null },
  setSelected: currentlyselected =>
    set({
      selected: { id: currentlyselected.id, type: currentlyselected.type },
    }),
}))

export default useEditorStore
