import { useEffect, useState } from 'react'
import type { FileProps, FolderProps, SelectedProps } from 'types/index'
import { useEditorStore } from '../store'

export default function useExplorer() {
  const [files, setFiles] = useState<FileProps[]>([])
  const [folders, setFolders] = useState<FolderProps[]>([])
  const [currentlySelected, setCurrentlySelected] = useState<SelectedProps>({
    type: null,
    id: null,
  })
  const setSelected = useEditorStore(state => state.setSelected)
  useEffect(() => {
    setSelected(currentlySelected)
  }, [currentlySelected, setSelected])

  function createFile() {
    const isFolderSelected =
      currentlySelected.type === 'folder' && currentlySelected.id

    const newFile: FileProps = {
      id: Date.now(),
      nested: isFolderSelected ? true : false,
      folderId: isFolderSelected ? currentlySelected.id : null,
      fileName: `file${files.length}`,
      selected: currentlySelected,
      setSelected: setCurrentlySelected,
    }
    setFiles(prev => [...prev, newFile])
  }

  function createFolder() {
    return setFolders(prev => [
      ...prev,
      {
        id: Date.now(),
        folderName: `folder${folders.length}`,
        selected: currentlySelected,
        files: [],
        setSelected: setCurrentlySelected,
      },
    ])
  }

  return {
    files,
    folders,
    createFile,
    createFolder,
    currentlySelected,
    setCurrentlySelected,
  }
}
