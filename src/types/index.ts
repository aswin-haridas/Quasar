export interface FileProps {
  id: number
  fileName: string
  nested: boolean
  selected: SelectedProps
  setSelected: React.Dispatch<React.SetStateAction<SelectedProps>>
}
export interface FolderProps {
  id: number
  folderName: string
  files: FileProps[]
  selected: SelectedProps
  setSelected: React.Dispatch<React.SetStateAction<SelectedProps>>
}

export interface SelectedProps {
  id: number | null
  type: 'folder' | 'file' | null
}

export interface FilesWrapperProps {
  files: FileProps[]
  folders: FolderProps[]
  selected: SelectedProps
  setSelected: React.Dispatch<React.SetStateAction<SelectedProps>>
}
