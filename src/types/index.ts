export interface SelectedProps {
  id: string | null
  type: 'folder' | 'file' | null
}

export interface Node {
  id: string
  name: string
  isFolder: boolean
  children?: Node[]
}
