export interface SelectedProps {
  id: number | null
  type: 'folder' | 'file' | null
}

export interface Node {
  id: number
  name: string
  isFolder: boolean
  children?: Node[]
}
