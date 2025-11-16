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
  nodes: [
    {
      id: 1,
      name: 'newFolder',
      isFolder: true,
      children: [],
    },
    {
      id: 2,
      name: 'newFolder1',
      isFolder: true,
      children: [
        {
          id: 7,
          name: 'notes.txt',
          isFolder: false,
        },
        {
          id: 8,
          name: 'archive',
          isFolder: true,
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: 'newFolder2',
      isFolder: true,
      children: [
        {
          id: 9,
          name: 'draft.docx',
          isFolder: false,
        },
      ],
    },
    {
      id: 4,
      name: 'earth',
      isFolder: true,
      children: [
        {
          id: 10,
          name: 'moon',
          isFolder: true,
          children: [
            {
              id: 11,
              name: 'crater.png',
              isFolder: false,
            },
          ],
        },
        {
          id: 12,
          name: 'apollo',
          isFolder: true,
          children: [
            {
              id: 13,
              name: 'mission.log',
              isFolder: false,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'sun',
      isFolder: false,
    },
    {
      id: 6,
      name: 'saturn',
      isFolder: false,
    },
  ],
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
