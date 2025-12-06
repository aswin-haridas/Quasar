import type { Node, SelectedProps } from '../types/index'
import { create } from 'zustand'

export type Theme = 'vs-dark' | 'light'

interface EditorState {
  content: string
  htmlContent: string
  theme: Theme
  nodes: Node[]
  viewMode: 'editor' | 'preview'
  updateContent: (newContent: string) => void
  updateHtmlContent: (newHtmlContent: string) => void
  setViewMode: (mode: 'editor' | 'preview') => void
  updateNodes: (newNodes: Node[]) => void
  setTheme: (theme: Theme) => void
  selected: SelectedProps
  setSelected: (selected: SelectedProps) => void
  renamingNodeId: string | null
  setRenamingNodeId: (id: string | null) => void
}

const useEditorStore = create<EditorState>()(set => ({
  content: '',
  htmlContent: '',
  theme: 'vs-dark',
  nodes: [],
  viewMode: 'editor',
  updateNodes: newNodes => set({ nodes: newNodes }),
  updateContent: newContent => set({ content: newContent }),
  updateHtmlContent: newHtmlContent => set({ htmlContent: newHtmlContent }),
  setViewMode: mode => set({ viewMode: mode }),
  setTheme: theme => set({ theme }),
  selected: { id: null, type: null },
  setSelected: currentlyselected =>
    set({
      selected: { id: currentlyselected.id, type: currentlyselected.type },
      // mode is now handled by fetch logic in Workplace, don't reset here blindly or defaulting to editor
      // allows better control elsewhere
    }),
  renamingNodeId: null,
  setRenamingNodeId: id => set({ renamingNodeId: id }),
}))

export default useEditorStore
